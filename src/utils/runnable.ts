/** Prepare Java snippet for JDoodle embed (adds a main entry if missing). */
export function toRunnableJava(code: string): string {
  const trimmed = code.trim();
  if (/public\s+static\s+void\s+main\s*\(/m.test(trimmed)) {
    return trimmed;
  }

  return `${trimmed}

// Runnable entry for JDoodle
public class Main {
    public static void main(String[] args) {
        System.out.println("Pattern demo loaded — explore the classes above.");
    }
}`;
}
