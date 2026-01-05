# /x-ppt-generate

Generate PowerPoint presentations interactively using HTML2PPTX workflow.

---

## Description

Creates professional PowerPoint presentations with Synaptic branding through guided conversation. The agent asks about purpose, audience, structure, and content, then generates an HTML-based presentation using the html2pptx.js converter.

---

## Workflow

1. **Prerequisites Check**:
   - Verify Node.js installed (>= 18.0.0)
   - Verify Python installed (>= 3.8)
   - Check pptx skill is available
   - Check html2pptx.js exists in skills/pptx/scripts/

2. **Launch Agent**:
   - Invoke `x-ppt-generator-agent`
   - Agent conducts interactive Q&A
   - Agent builds presentation structure
   - Agent generates HTML content
   - Agent creates generation script

3. **Script Generation**:
   - Create `output/` directory if not exists
   - Generate Node.js script with:
     - HTML structure for all slides
     - html2pptx.js integration
     - Synaptic branding constants
     - Console logging
   - Save script to `output/{presentation-name}.js`

4. **Execute Script**:
   - Run generated script via Node.js
   - Script calls html2pptx.js with HTML content
   - Outputs .pptx file to `output/` folder

5. **Completion**:
   - Show success message with file paths
   - Display script location (for reuse/modification)
   - Display .pptx location (for viewing)

---

## Usage

```
/x-ppt-generate
```

No parameters required - all inputs gathered via interactive Q&A.

---

## Output

- `output/{name}.js` - Reusable generation script
- `output/{name}.pptx` - Generated presentation
- Console log with progress and file locations

---

## Error Handling

- **Node.js not found**: Display installation instructions
- **Python not found**: Display installation instructions
- **html2pptx.js missing**: Check skills/pptx/scripts/ folder
- **Script execution failure**: Show error, suggest debugging
- **File write failure**: Check permissions on output/ folder

---

## Notes

- Script is reusable - users can modify and re-run
- Presentation uses Synaptic branding by default
- HTML2PPTX workflow allows flexible content structure
