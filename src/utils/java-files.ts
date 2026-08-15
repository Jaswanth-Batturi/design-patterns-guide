/**
 * Prepare Java source for OneCompiler embed.
 * Must be ONE file: multi-file demos open the wrong tab and Run fails
 * ("Main method not found in class AppConfig").
 */
export function javaToCompilerFiles(code: string): Array<{ name: string; content: string }> {
  const trimmed = code.trim();
  if (!trimmed) {
    return [
      {
        name: 'Main.java',
        content: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Design Patterns");
    }
}`,
      },
    ];
  }

  const publicClass = trimmed.match(/^public\s+class\s+(\w+)/m);
  const name = publicClass ? `${publicClass[1]}.java` : 'Main.java';

  return [{ name, content: trimmed }];
}

/**
 * Resolve the public class name that contains main() — used for embed filename.
 */
export function javaMainClassName(code: string): string {
  const trimmed = code.trim();
  const withMain = trimmed.match(/public\s+class\s+(\w+)[\s\S]*?public\s+static\s+void\s+main\s*\(/m);
  if (withMain) return withMain[1];

  const anyPublic = trimmed.match(/^public\s+class\s+(\w+)/m);
  return anyPublic?.[1] ?? 'Main';
}
