import re
import os

files = [
    r"E:\Vybtek\development\VybTek\blog.html",
    r"E:\Vybtek\development\VybTek\portfolio.html",
    r"E:\Vybtek\development\VybTek\careers.html",
    r"E:\Vybtek\development\VybTek\services\website-development.html",
    r"E:\Vybtek\development\VybTek\services\software-development.html",
    r"E:\Vybtek\development\VybTek\services\it-consulting.html",
    r"E:\Vybtek\development\VybTek\services\cloud-infrastructure.html",
    r"E:\Vybtek\development\VybTek\services\ui-ux.html",
    r"E:\Vybtek\development\VybTek\services\app-development.html"
]

replacements = [
    (re.compile(r'(?i)#6366F1|#4F46E5|#8B5CF6|#7C3AED'), '#1044C8'),
    (re.compile(r'(?i)\bindigo-'), 'blue-'),
    (re.compile(r'(?i)\bpurple-'), 'blue-'),
    (re.compile(r'(?i)#002D62'), '#0D1B3E'),
    (re.compile(r'(?i)#05060A'), '#0D1B3E'),
    (re.compile(r'(?i)#06B6D4'), '#00C8E6'),
    (re.compile(r'(?i)\bteal-'), 'cyan-'),
    (re.compile(r'(?i)#22C55E|#10B981'), '#00C8E6'),
    (re.compile(r'(?i)\bgreen-'), 'cyan-'),
    (re.compile(r'(?i)\borange-'), 'blue-'),
    (re.compile(r'(?i)\bamber-'), 'blue-'),
    (re.compile(r'(?i)\brose-'), 'blue-')
]

for filepath in files:
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    changes = []
    
    for regex, repl in replacements:
        matches = regex.findall(content)
        if matches:
            changes.append(f"{regex.pattern} -> {repl} ({len(matches)} times)")
            content = regex.sub(repl, content)
            
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(filepath)}:")
        for change in changes:
            print(f"  - {change}")
    else:
        print(f"No changes in {os.path.basename(filepath)}")
