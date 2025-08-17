# LLMs.txt Maintenance Guide

## Overview
The `/llms.txt` file helps AI assistants understand and navigate our site content. It should be updated when major pages are added, removed, or restructured.

## When to Update

### Always Update For:
- New major service pages or product launches
- Significant URL changes or redirects
- New blog categories or important content sections
- Changes to core navigation structure
- Rebranding or domain changes

### Optional Updates For:
- Individual blog posts (unless exceptionally important)
- Minor page content changes
- Temporary promotional pages
- Internal tool updates

## How to Update

1. **Edit the file**: `public/llms.txt`
2. **Update the date**: Change `_Last-Updated:` to current ISO date (YYYY-MM-DD)
3. **Validate links**: Ensure all URLs return 200 status codes
4. **Test redirects**: Verify `/llm.txt` still redirects to `/llms.txt`

## Content Guidelines

### Link Format
```markdown
- [Page Title](https://zwanski.org/path): Brief description of page importance
```

### Descriptions Should:
- Be one line maximum
- Explain WHY the page matters (not just what it is)
- Use action words when appropriate
- Avoid marketing jargon

### Section Organization
- **Core Pages**: Essential navigation and conversion pages
- **Academy & Education**: Learning content and resources
- **Marketplace & Community**: User-generated and community content
- **Free Tools**: Utility pages and interactive tools
- **Policies & Support**: Legal and help content
- **Brand & Media**: Company information and assets
- **Optional**: Secondary content safe to skip in small contexts

## Validation Checklist

Before deploying updates:

- [ ] All URLs are absolute (https://zwanski.org/...)
- [ ] All links return 200 status (test with curl or browser)
- [ ] No admin/private URLs included
- [ ] Last-Updated field shows current date
- [ ] Markdown syntax is valid
- [ ] File size under 10KB (aim for <5KB)

## Automation Opportunities

Consider adding to CI/CD:
- Link validation script
- Automatic date update on content changes
- File size monitoring
- Redirect testing

## Integration with Content Workflow

- Add `/llms.txt` review to major site updates
- Include in SEO audit checklist
- Consider when planning site architecture changes
- Update alongside sitemap.xml changes

## Troubleshooting

### Common Issues:
- **404 errors**: Check server configuration for static file serving
- **Wrong MIME type**: Ensure `_headers` file is properly configured
- **Redirect not working**: Verify `_redirects` file syntax
- **Content not updating**: Check cache headers and CDN invalidation

### Testing Commands:
```bash
# Test main file
curl -I https://zwanski.org/llms.txt

# Test redirect
curl -I https://zwanski.org/llm.txt

# Validate all links (requires link checker tool)
linkchecker https://zwanski.org/llms.txt
```

## Contact

For questions about LLMs.txt maintenance, contact the development team or refer to the [llmstxt.org](https://llmstxt.org/) specification.