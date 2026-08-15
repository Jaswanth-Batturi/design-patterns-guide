/**
 * Split Java source into OneCompiler file entries and ensure compilable structure.
 */
export function javaToCompilerFiles(code: string): Array<{ name: string; content: string }> {
  const trimmed = code.trim();
  if (!trimmed) {
    return [
      {
        name: 'Main.java',
        content: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Design Patterns, Simply");
    }
}`,
      },
    ];
  }

  const blocks: string[] = [];
  const lines = trimmed.split('\n');
  let current = '';

  const isTypeStart = (line: string) =>
    /^(?:public\s+)?(?:class|interface|enum|record)\s+\w+/.test(line.trim());

  for (const line of lines) {
    if (isTypeStart(line) && current.trim()) {
      blocks.push(current.trim());
      current = line + '\n';
    } else {
      current += line + '\n';
    }
  }
  if (current.trim()) blocks.push(current.trim());

  let publicFileUsed = false;
  const files = blocks.map((block) => {
    const nameMatch = block.match(/^(?:public\s+)?(?:class|interface|enum|record)\s+(\w+)/);
    const typeName = nameMatch?.[1] ?? 'Main';
    let content = block;

    if (/^public\s+(class|interface|enum|record)\s+/m.test(content)) {
      if (publicFileUsed) {
        content = content.replace(/^public\s+(?=class|interface|enum|record)/m, '');
      } else {
        publicFileUsed = true;
      }
    }

    return { name: `${typeName}.java`, content };
  });

  const hasMain = files.some((f) => /public\s+static\s+void\s+main\s*\(/m.test(f.content));
  if (!hasMain) {
    files.push({
      name: 'Main.java',
      content: `public class Main {
    public static void main(String[] args) {
        System.out.println("Pattern demo loaded. Try calling classes from the example above.");
    }
}`,
    });
  }

  return files;
}
