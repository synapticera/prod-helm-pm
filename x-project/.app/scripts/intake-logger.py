#!/usr/bin/env python3
"""
Intake Logger - Logs intake commands and task additions for x-system projects.

This script provides logging functionality for:
- x-intake: Interactive intake sessions
- x-intake-file: File-based intake from intake.md
- add-task: Task additions to the backlog

Usage:
    python intake-logger.py log-intake-file [--project-path PATH]
    python intake-logger.py log-intake --content "CONTENT" [--project-path PATH]
    python intake-logger.py log-task --title "TITLE" --description "DESC" [--project-path PATH]
    python intake-logger.py list [--type intake|task] [--project-path PATH]
    python intake-logger.py clean [--days N] [--project-path PATH]

The script will:
1. Create timestamped copies of intake files
2. Store logs in x-project/logs/intake/ or x-project/logs/tasks/
3. Maintain a manifest of all logged items
"""

import argparse
import json
import os
import shutil
import sys
from datetime import datetime, timedelta
from pathlib import Path


def get_project_path(project_path=None):
    """Get the project path, defaulting to current working directory."""
    if project_path:
        return Path(project_path)
    return Path.cwd()


def get_logs_dir(project_path, log_type='intake'):
    """Get the logs directory for the specified type."""
    logs_dir = project_path / 'x-project' / 'logs' / log_type
    logs_dir.mkdir(parents=True, exist_ok=True)
    return logs_dir


def get_timestamp():
    """Get current timestamp in a filename-safe format."""
    return datetime.now().strftime('%Y%m%d-%H%M%S')


def get_readable_timestamp():
    """Get current timestamp in a human-readable format."""
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


def load_manifest(logs_dir):
    """Load the manifest file for the logs directory."""
    manifest_path = logs_dir / 'manifest.json'
    if manifest_path.exists():
        with open(manifest_path, 'r') as f:
            return json.load(f)
    return {'entries': []}


def save_manifest(logs_dir, manifest):
    """Save the manifest file."""
    manifest_path = logs_dir / 'manifest.json'
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)


def log_intake_file(project_path=None):
    """
    Log the current intake.md file with a timestamp.

    Creates a copy of x-project/intake.md as:
    x-project/logs/intake/intake-YYYYMMDD-HHMMSS.md
    """
    project_path = get_project_path(project_path)
    intake_file = project_path / 'x-project' / 'intake.md'

    if not intake_file.exists():
        print(f"Error: intake.md not found at {intake_file}", file=sys.stderr)
        return False

    logs_dir = get_logs_dir(project_path, 'intake')
    timestamp = get_timestamp()

    # Create the logged copy
    logged_file = logs_dir / f'intake-{timestamp}.md'
    shutil.copy2(intake_file, logged_file)

    # Update manifest
    manifest = load_manifest(logs_dir)
    manifest['entries'].append({
        'type': 'intake-file',
        'timestamp': get_readable_timestamp(),
        'file': logged_file.name,
        'source': str(intake_file.relative_to(project_path))
    })
    save_manifest(logs_dir, manifest)

    print(f"Logged intake file: {logged_file.name}")
    return True


def log_intake(content, summary=None, mode='simple', project_path=None):
    """
    Log an interactive intake session.

    Creates a file at:
    x-project/logs/intake/session-YYYYMMDD-HHMMSS.md
    """
    project_path = get_project_path(project_path)
    logs_dir = get_logs_dir(project_path, 'intake')
    timestamp = get_timestamp()

    # Create the log file
    logged_file = logs_dir / f'session-{timestamp}.md'

    log_content = f"""# Intake Session Log

**Timestamp:** {get_readable_timestamp()}
**Mode:** {mode}
**Summary:** {summary or 'Interactive intake session'}

---

## Session Content

{content}

---

*Logged by intake-logger.py*
"""

    with open(logged_file, 'w') as f:
        f.write(log_content)

    # Update manifest
    manifest = load_manifest(logs_dir)
    manifest['entries'].append({
        'type': 'intake-session',
        'timestamp': get_readable_timestamp(),
        'file': logged_file.name,
        'mode': mode,
        'summary': summary or 'Interactive intake session'
    })
    save_manifest(logs_dir, manifest)

    print(f"Logged intake session: {logged_file.name}")
    return True


def log_task(title, description=None, priority=None, task_type=None, project_path=None):
    """
    Log a task addition.

    Creates an entry in x-project/logs/tasks/tasks-log.md
    and individual task files.
    """
    project_path = get_project_path(project_path)
    logs_dir = get_logs_dir(project_path, 'tasks')
    timestamp = get_timestamp()

    # Create individual task log file
    safe_title = ''.join(c if c.isalnum() or c in ' -_' else '' for c in title)[:50]
    safe_title = safe_title.replace(' ', '-').lower()
    logged_file = logs_dir / f'task-{timestamp}-{safe_title}.md'

    log_content = f"""# Task Log Entry

**Timestamp:** {get_readable_timestamp()}
**Title:** {title}
**Priority:** {priority or 'Medium'}
**Type:** {task_type or 'Feature'}

---

## Description

{description or 'No description provided.'}

---

*Logged by intake-logger.py*
"""

    with open(logged_file, 'w') as f:
        f.write(log_content)

    # Update manifest
    manifest = load_manifest(logs_dir)
    manifest['entries'].append({
        'type': 'task',
        'timestamp': get_readable_timestamp(),
        'file': logged_file.name,
        'title': title,
        'priority': priority or 'Medium',
        'task_type': task_type or 'Feature'
    })
    save_manifest(logs_dir, manifest)

    # Also append to consolidated log file
    consolidated_log = logs_dir / 'tasks-log.md'
    entry = f"\n## {get_readable_timestamp()} - {title}\n\n"
    entry += f"- **Priority:** {priority or 'Medium'}\n"
    entry += f"- **Type:** {task_type or 'Feature'}\n"
    if description:
        entry += f"- **Description:** {description}\n"
    entry += f"- **Log file:** {logged_file.name}\n\n---\n"

    if not consolidated_log.exists():
        with open(consolidated_log, 'w') as f:
            f.write("# Task Addition Log\n\nHistory of tasks added to the backlog.\n\n---\n")

    with open(consolidated_log, 'a') as f:
        f.write(entry)

    print(f"Logged task: {logged_file.name}")
    return True


def list_logs(log_type=None, project_path=None):
    """List all logged entries."""
    project_path = get_project_path(project_path)

    types_to_check = ['intake', 'tasks'] if log_type is None else [log_type]

    for lt in types_to_check:
        logs_dir = project_path / 'x-project' / 'logs' / lt
        if not logs_dir.exists():
            print(f"\nNo {lt} logs found.")
            continue

        manifest = load_manifest(logs_dir)
        entries = manifest.get('entries', [])

        if not entries:
            print(f"\nNo {lt} log entries found.")
            continue

        print(f"\n=== {lt.upper()} LOGS ===")
        print(f"Location: {logs_dir}")
        print("-" * 50)

        for entry in reversed(entries[-10:]):  # Show last 10 entries
            timestamp = entry.get('timestamp', 'Unknown')
            file_name = entry.get('file', 'Unknown')
            entry_type = entry.get('type', 'Unknown')

            if entry_type == 'task':
                title = entry.get('title', 'Untitled')
                print(f"  [{timestamp}] {title} ({file_name})")
            else:
                summary = entry.get('summary', entry.get('source', 'No summary'))
                print(f"  [{timestamp}] {entry_type}: {summary}")

    print()


def clean_old_logs(days=30, project_path=None):
    """Clean logs older than specified days."""
    project_path = get_project_path(project_path)
    cutoff_date = datetime.now() - timedelta(days=days)

    cleaned_count = 0

    for log_type in ['intake', 'tasks']:
        logs_dir = project_path / 'x-project' / 'logs' / log_type
        if not logs_dir.exists():
            continue

        manifest = load_manifest(logs_dir)
        entries = manifest.get('entries', [])
        new_entries = []

        for entry in entries:
            timestamp_str = entry.get('timestamp', '')
            try:
                entry_date = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')
                if entry_date < cutoff_date:
                    # Delete the file
                    file_path = logs_dir / entry.get('file', '')
                    if file_path.exists():
                        file_path.unlink()
                        cleaned_count += 1
                else:
                    new_entries.append(entry)
            except ValueError:
                new_entries.append(entry)  # Keep entries with unparseable dates

        manifest['entries'] = new_entries
        save_manifest(logs_dir, manifest)

    print(f"Cleaned {cleaned_count} log entries older than {days} days.")


def main():
    parser = argparse.ArgumentParser(
        description='Intake Logger - Log intake commands and task additions',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )

    subparsers = parser.add_subparsers(dest='command', help='Available commands')

    # log-intake-file command
    intake_file_parser = subparsers.add_parser(
        'log-intake-file',
        help='Log the current intake.md file'
    )
    intake_file_parser.add_argument(
        '--project-path', '-p',
        help='Path to the project (default: current directory)'
    )

    # log-intake command
    intake_parser = subparsers.add_parser(
        'log-intake',
        help='Log an interactive intake session'
    )
    intake_parser.add_argument(
        '--content', '-c',
        required=True,
        help='Content of the intake session'
    )
    intake_parser.add_argument(
        '--summary', '-s',
        help='Brief summary of the session'
    )
    intake_parser.add_argument(
        '--mode', '-m',
        default='simple',
        choices=['simple', 'full'],
        help='Mode of the intake session'
    )
    intake_parser.add_argument(
        '--project-path', '-p',
        help='Path to the project (default: current directory)'
    )

    # log-task command
    task_parser = subparsers.add_parser(
        'log-task',
        help='Log a task addition'
    )
    task_parser.add_argument(
        '--title', '-t',
        required=True,
        help='Task title'
    )
    task_parser.add_argument(
        '--description', '-d',
        help='Task description'
    )
    task_parser.add_argument(
        '--priority',
        choices=['High', 'Medium', 'Low'],
        default='Medium',
        help='Task priority'
    )
    task_parser.add_argument(
        '--type',
        dest='task_type',
        choices=['Feature', 'Bug', 'Refactor', 'Documentation', 'Testing'],
        default='Feature',
        help='Task type'
    )
    task_parser.add_argument(
        '--project-path', '-p',
        help='Path to the project (default: current directory)'
    )

    # list command
    list_parser = subparsers.add_parser(
        'list',
        help='List logged entries'
    )
    list_parser.add_argument(
        '--type',
        dest='log_type',
        choices=['intake', 'tasks'],
        help='Type of logs to list (default: all)'
    )
    list_parser.add_argument(
        '--project-path', '-p',
        help='Path to the project (default: current directory)'
    )

    # clean command
    clean_parser = subparsers.add_parser(
        'clean',
        help='Clean old log entries'
    )
    clean_parser.add_argument(
        '--days', '-d',
        type=int,
        default=30,
        help='Delete logs older than N days (default: 30)'
    )
    clean_parser.add_argument(
        '--project-path', '-p',
        help='Path to the project (default: current directory)'
    )

    args = parser.parse_args()

    if args.command == 'log-intake-file':
        success = log_intake_file(args.project_path)
        sys.exit(0 if success else 1)

    elif args.command == 'log-intake':
        success = log_intake(
            args.content,
            args.summary,
            args.mode,
            args.project_path
        )
        sys.exit(0 if success else 1)

    elif args.command == 'log-task':
        success = log_task(
            args.title,
            args.description,
            args.priority,
            args.task_type,
            args.project_path
        )
        sys.exit(0 if success else 1)

    elif args.command == 'list':
        list_logs(args.log_type, args.project_path)

    elif args.command == 'clean':
        clean_old_logs(args.days, args.project_path)

    else:
        parser.print_help()
        sys.exit(1)


if __name__ == '__main__':
    main()
