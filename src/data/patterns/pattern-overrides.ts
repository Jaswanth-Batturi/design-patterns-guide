/**
 * Hand-written clarity layer: real-life scenes, tradeoffs, runnable demos, and guided steps.
 * Merged into each pattern by enrichPattern() — overrides generic auto-generated defaults.
 */
export interface PatternEnrichment {
  sceneSteps: string[];
  withoutPatternPains: string[];
  withPatternWins: string[];
  codeTakeaway: string;
  tryItSteps: string[];
  runDemo: string;
  codeBeforeHint?: string;
  codeAfterHint?: string;
}

export const patternEnrichment: Record<string, PatternEnrichment> = {
  singleton: {
    sceneSteps: [
      'Your apartment has one electric meter — every room shares the same reading',
      'If two meters existed, bills would disagree and nobody would know the real usage',
      'One meter, one truth: everyone reads the same number',
    ],
    withoutPatternPains: [
      'Two config objects load different API URLs — bugs appear only in production',
      'Tests cannot swap settings because code scattered `new AppConfig()` everywhere',
      'Memory wasted duplicating the same heavy connection pool',
    ],
    withPatternWins: [
      'Every part of the app reads the same shared instance',
      'One place to initialize expensive resources',
      'You control exactly when the single instance is created',
    ],
    codeTakeaway:
      'Without Singleton, anyone can `new AppConfig()` and settings drift. With it, `getInstance()` is the only door — same object every time.',
    tryItSteps: [
      'Wait until the editor loads (spinner disappears).',
      'Confirm the tab says SingletonDemo.java (one file — all code together).',
      'Click Run ▶ inside the dark editor box.',
      'You should see Theme is now: dark and Same object? true',
    ],
    codeBeforeHint: 'Anyone can create a new config — settings can disagree.',
    codeAfterHint: 'Only one instance exists; everyone uses getInstance().',
    runDemo: `class AppConfig {
    private static AppConfig instance;
    private String theme = "light";

    private AppConfig() {}

    static AppConfig getInstance() {
        if (instance == null) instance = new AppConfig();
        return instance;
    }

    void setTheme(String theme) {
        this.theme = theme;
        System.out.println("Theme is now: " + theme);
    }
}

public class SingletonDemo {
    public static void main(String[] args) {
        AppConfig a = AppConfig.getInstance();
        AppConfig b = AppConfig.getInstance();
        a.setTheme("dark");
        System.out.println("Same object? " + (a == b));
    }
}`,
  },

  factory: {
    sceneSteps: [
      'You tell the waiter "burger" — you never walk into the kitchen',
      'The kitchen picks the recipe and assembles your meal',
      'You get food; the waiter never needs to know cooking details',
    ],
    withoutPatternPains: [
      'export() is a growing if/else for pdf, excel, csv…',
      'Adding a format means editing the same method again',
      'Client code depends on every concrete exporter class',
    ],
    withPatternWins: [
      'Client asks a creator; creator picks the right product',
      'New format = new small class, not a bigger if-chain',
      'Callers depend on Exporter interface, not concrete types',
    ],
    codeTakeaway:
      'The smell is `new PdfExporter()` inside business logic. Factory Method moves "which class?" into a creator subclass.',
    tryItSteps: [
      'Wait for the editor, then click Run ▶ inside the box.',
      'Output shows PDF then Excel export lines.',
      'Change the creator type in main() and Run again — same client code, different product.',
    ],
    codeBeforeHint: 'Client chooses concrete classes with if/else.',
    codeAfterHint: 'Creator subclass decides which Exporter to build.',
    runDemo: `interface Exporter {
    void export(String data);
}

class PdfExporter implements Exporter {
    public void export(String data) { System.out.println("PDF: " + data); }
}

class ExcelExporter implements Exporter {
    public void export(String data) { System.out.println("Excel: " + data); }
}

abstract class ExporterCreator {
    abstract Exporter create();
    void generate(String data) { create().export(data); }
}

class PdfCreator extends ExporterCreator {
    Exporter create() { return new PdfExporter(); }
}

class ExcelCreator extends ExporterCreator {
    Exporter create() { return new ExcelExporter(); }
}

public class FactoryDemo {
    public static void main(String[] args) {
        ExporterCreator pdf = new PdfCreator();
        pdf.generate("Q1 report");
        ExporterCreator excel = new ExcelCreator();
        excel.generate("Q1 report");
    }
}`,
  },

  'abstract-factory': {
    sceneSteps: [
      'You pick a furniture style: Modern or Victorian',
      'The showroom gives you a matching chair, sofa, and table',
      'No mixing a Victorian chair with a Modern sofa — the set stays consistent',
    ],
    withoutPatternPains: [
      'Mac button paired with Windows checkbox by accident',
      'Each UI piece picked separately — families get mixed',
      'Switching theme means hunting every `new` in the app',
    ],
    withPatternWins: [
      'One factory produces a whole compatible UI kit',
      'Swap factories to switch platform or theme at once',
      'Client code only sees Button and Checkbox interfaces',
    ],
    codeTakeaway:
      'Abstract Factory fixes "related products must match." One factory call gives you a whole family, not one object at a time.',
    tryItSteps: [
      'Run ▶ inside the editor.',
      'See Mac-style UI lines, then Win-style lines.',
      'Notice one factory creates both button and checkbox together.',
    ],
    codeBeforeHint: 'Risk of mixing incompatible UI parts from different families.',
    codeAfterHint: 'One factory builds a matching button + checkbox set.',
    runDemo: `interface Button { void render(); }
interface Checkbox { void render(); }

interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

class MacButton implements Button { public void render() { System.out.println("[Mac] Button"); } }
class MacCheckbox implements Checkbox { public void render() { System.out.println("[Mac] Checkbox"); } }
class WinButton implements Button { public void render() { System.out.println("[Win] Button"); } }
class WinCheckbox implements Checkbox { public void render() { System.out.println("[Win] Checkbox"); } }

class MacFactory implements UIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}

class WinFactory implements UIFactory {
    public Button createButton() { return new WinButton(); }
    public Checkbox createCheckbox() { return new WinCheckbox(); }
}

public class AbstractFactoryDemo {
    static void paint(UIFactory factory) {
        factory.createButton().render();
        factory.createCheckbox().render();
    }

    public static void main(String[] args) {
        paint(new MacFactory());
        paint(new WinFactory());
    }
}`,
  },

  builder: {
    sceneSteps: [
      'You order a custom sandwich: bread, protein, toppings, sauce',
      'The counter worker adds each layer step by step',
      'You get one perfect sandwich — not a pile of ingredients to assemble yourself',
    ],
    withoutPatternPains: [
      'Constructor with 12 parameters — easy to pass null in wrong order',
      'Half-built objects floating around the codebase',
      'Every new optional field breaks every caller',
    ],
    withPatternWins: [
      'Fluent steps: set what you need, skip the rest',
      'Director can define standard builds (e.g. "house burger")',
      'Object is complete and valid before anyone uses it',
    ],
    codeTakeaway:
      'Builder replaces telescoping constructors. You assemble piece by piece, then `build()` returns a ready object.',
    tryItSteps: [
      'Run ▶ — see a fully built burger printed.',
      'Add .cheese("swiss") in the builder chain and Run again.',
    ],
    codeBeforeHint: 'Huge constructor — hard to read and easy to mess up.',
    codeAfterHint: 'Step-by-step builder — only set what you need.',
    runDemo: `class Burger {
    final String bread, patty, cheese;
    Burger(String bread, String patty, String cheese) {
        this.bread = bread; this.patty = patty; this.cheese = cheese;
    }
    String describe() { return bread + " + " + patty + " + " + cheese; }
}

class BurgerBuilder {
    private String bread = "bun";
    private String patty = "beef";
    private String cheese = "none";

    BurgerBuilder cheese(String c) { cheese = c; return this; }

    Burger build() { return new Burger(bread, patty, cheese); }
}

public class BuilderDemo {
    public static void main(String[] args) {
        Burger b = new BurgerBuilder().cheese("cheddar").build();
        System.out.println(b.describe());
    }
}`,
  },

  prototype: {
    sceneSteps: [
      'You photocopy a filled form instead of handwriting every field again',
      'Change only the name on the copy — rest stays identical',
      'Fast duplicates without rebuilding from scratch',
    ],
    withoutPatternPains: [
      'Rebuilding a complex object from DB or config every time',
      'Copy logic duplicated in many places',
      'Easy to miss a field when cloning manually',
    ],
    withPatternWins: [
      'clone() or copy factory produces a faithful duplicate',
      'Customize the copy without touching the original',
      'Hide internal structure from clients who need copies',
    ],
    codeTakeaway:
      'Prototype means "duplicate an existing object" instead of calling a long constructor again.',
    tryItSteps: [
      'Run ▶ — original and copy both print, with different names.',
      'Change the copy\'s name field and Run — original stays unchanged.',
    ],
    codeBeforeHint: 'Manual field-by-field copy — easy to forget a field.',
    codeAfterHint: 'clone() duplicates the whole object in one step.',
    runDemo: `class Form implements Cloneable {
    String name, address;
    Form(String name, String address) { this.name = name; this.address = address; }
    Form copy() throws CloneNotSupportedException { return (Form) super.clone(); }
    void show() { System.out.println(name + " @ " + address); }
}

public class PrototypeDemo {
    public static void main(String[] args) throws CloneNotSupportedException {
        Form original = new Form("Alice", "123 Main");
        Form copy = original.copy();
        copy.name = "Bob";
        original.show();
        copy.show();
    }
}`,
  },

  adapter: {
    sceneSteps: [
      'Your EU plug won\'t fit a US outlet',
      'You use a travel adapter — same plug, new socket shape',
      'Your device works without redesigning the hotel wiring',
    ],
    withoutPatternPains: [
      'Legacy payment API uses different method names than your app expects',
      'Every caller wraps the old API in custom glue code',
      'Swapping vendors means rewriting many classes',
    ],
    withPatternWins: [
      'One adapter class translates old → new interface',
      'App code only speaks the interface it already knows',
      'Replace legacy system by swapping the adapter',
    ],
    codeTakeaway:
      'Adapter is a translator. Client calls `charge()`; adapter forwards to legacy `payNow()`.',
    tryItSteps: [
      'Run ▶ — client uses modern interface, legacy system still runs underneath.',
    ],
    codeBeforeHint: 'Client forced to call incompatible legacy methods.',
    codeAfterHint: 'Adapter translates so client uses one clean interface.',
    runDemo: `class LegacyPayment {
    void payNow(double amount) { System.out.println("Legacy paid " + amount); }
}

interface PaymentProcessor {
    void charge(double amount);
}

class PaymentAdapter implements PaymentProcessor {
    private final LegacyPayment legacy = new LegacyPayment();
    public void charge(double amount) { legacy.payNow(amount); }
}

public class AdapterDemo {
    public static void main(String[] args) {
        PaymentProcessor p = new PaymentAdapter();
        p.charge(49.99);
    }
}`,
  },

  bridge: {
    sceneSteps: [
      'A TV remote (abstraction) works with any TV brand (implementation)',
      'Sony and Samsung TVs respond differently to the same "power" button',
      'You swap the TV without redesigning every remote button',
    ],
    withoutPatternPains: [
      'Shape classes multiply: RedCircle, BlueCircle, RedSquare…',
      'Color and shape locked together — cannot vary independently',
      'New color means new subclasses for every shape',
    ],
    withPatternWins: [
      'Abstraction holds a reference to implementation',
      'Change color or device without subclass explosion',
      'Runtime swapping of implementation',
    ],
    codeTakeaway:
      'Bridge splits "what you do" from "how it\'s done." Remote calls device.on(); Sony vs Samsung differ inside device.',
    tryItSteps: [
      'Run ▶ — same remote controls two different device implementations.',
    ],
    codeBeforeHint: 'Cartesian explosion of subclasses (color × shape).',
    codeAfterHint: 'Shape delegates drawing to a separate Color implementation.',
    runDemo: `interface Device { void on(); }

class SonyTv implements Device { public void on() { System.out.println("Sony TV on"); } }
class SamsungTv implements Device { public void on() { System.out.println("Samsung TV on"); } }

class Remote {
    private final Device device;
    Remote(Device device) { this.device = device; }
    void power() { device.on(); }
}

public class BridgeDemo {
    public static void main(String[] args) {
        Remote sony = new Remote(new SonyTv());
        Remote samsung = new Remote(new SamsungTv());
        sony.power();
        samsung.power();
    }
}`,
  },

  composite: {
    sceneSteps: [
      'A folder on your laptop holds files and smaller folders',
      'You "delete folder" once — everything inside goes together',
      'Files and folders treated the same: both are "things in the tree"',
    ],
    withoutPatternPains: [
      'Special cases everywhere: if folder else file',
      'Adding a new node type breaks every traversal',
      'Clients cannot treat leaves and groups uniformly',
    ],
    withPatternWins: [
      'File and Folder both implement the same Component interface',
      'Operations like size() recurse naturally through children',
      'New component types plug into the same tree API',
    ],
    codeTakeaway:
      'Composite lets you call `render()` on the root — files and folders respond through the same interface.',
    tryItSteps: [
      'Run ▶ — tree prints folder and nested files in one call.',
    ],
    codeBeforeHint: 'Separate handling for single items vs containers.',
    codeAfterHint: 'One interface — folders delegate to children.',
    runDemo: `interface Node { void show(String indent); }

class FileNode implements Node {
    private final String name;
    FileNode(String name) { this.name = name; }
    public void show(String indent) { System.out.println(indent + "📄 " + name); }
}

class Folder implements Node {
    private final String name;
    private final java.util.List<Node> kids = new java.util.ArrayList<>();
    Folder(String name) { this.name = name; }
    void add(Node n) { kids.add(n); }
    public void show(String indent) {
        System.out.println(indent + "📁 " + name);
        for (Node k : kids) k.show(indent + "  ");
    }
}

public class CompositeDemo {
    public static void main(String[] args) {
        Folder root = new Folder("project");
        root.add(new FileNode("readme.md"));
        Folder src = new Folder("src");
        src.add(new FileNode("App.java"));
        root.add(src);
        root.show("");
    }
}`,
  },

  decorator: {
    sceneSteps: [
      'You order plain coffee, then add milk, then whipped cream',
      'Each addon wraps the drink — same cup, extra layers',
      'Pay for coffee + addons without inventing "CoffeeWithMilkAndCream" class',
    ],
    withoutPatternPains: [
      'Subclass explosion: BufferedFile, EncryptedBufferedFile…',
      'Cannot mix features at runtime (encrypt yes, buffer no)',
      'Base class grows with every combination',
    ],
    withPatternWins: [
      'Wrap object in decorators that share the same interface',
      'Stack features at runtime: new Encrypt(new Buffer(stream))',
      'Add new decorator without touching existing classes',
    ],
    codeTakeaway:
      'Decorator wraps and forwards calls, adding behavior before/after. Same interface, stacked layers.',
    tryItSteps: [
      'Run ▶ — plain text, then buffered, then encrypted output.',
    ],
    codeBeforeHint: 'Subclass per feature combination.',
    codeAfterHint: 'Stack decorators — each adds one feature.',
    runDemo: `interface DataSource { String read(); }

class PlainSource implements DataSource {
    public String read() { return "hello"; }
}

class UpperDecorator implements DataSource {
    private final DataSource inner;
    UpperDecorator(DataSource inner) { this.inner = inner; }
    public String read() { return inner.read().toUpperCase(); }
}

class ExclaimDecorator implements DataSource {
    private final DataSource inner;
    ExclaimDecorator(DataSource inner) { this.inner = inner; }
    public String read() { return inner.read() + "!"; }
}

public class DecoratorDemo {
    public static void main(String[] args) {
        DataSource plain = new PlainSource();
        DataSource fancy = new ExclaimDecorator(new UpperDecorator(plain));
        System.out.println(plain.read());
        System.out.println(fancy.read());
    }
}`,
  },

  facade: {
    sceneSteps: [
      'Hotel front desk: one call handles room, spa, and dinner booking',
      'You don\'t talk to housekeeping, chef, and concierge separately',
      'One simple request — hotel coordinates the backstage work',
    ],
    withoutPatternPains: [
      'Client juggles 5 subsystem classes to complete one user action',
      'Subsystem APIs leak into UI layer',
      'Small workflow change breaks many screens',
    ],
    withPatternWins: [
      'Facade exposes `bookWeekend()` hiding internal steps',
      'Subsystems can change behind the facade',
      'Easier onboarding — learn one entry point',
    ],
    codeTakeaway:
      'Facade is the "front desk" API. Inside it calls inventory, payment, email — client sees one method.',
    tryItSteps: [
      'Run ▶ — one facade call triggers multiple subsystem logs.',
    ],
    codeBeforeHint: 'Client orchestrates many subsystems manually.',
    codeAfterHint: 'Facade bundles steps into one simple call.',
    runDemo: `class Inventory { void reserve() { System.out.println("Room reserved"); } }
class Payment { void charge() { System.out.println("Payment taken"); } }
class Email { void send() { System.out.println("Confirmation emailed"); } }

class HotelFacade {
    private final Inventory inventory = new Inventory();
    private final Payment payment = new Payment();
    private final Email email = new Email();

    void bookWeekend() {
        inventory.reserve();
        payment.charge();
        email.send();
    }
}

public class FacadeDemo {
    public static void main(String[] args) {
        new HotelFacade().bookWeekend();
    }
}`,
  },

  flyweight: {
    sceneSteps: [
      'A document uses the letter "e" thousands of times',
      'Instead of 5,000 objects, store one "e" glyph and reuse its shape',
      'Each position only stores coordinates — memory stays small',
    ],
    withoutPatternPains: [
      'Millions of identical tree nodes each hold duplicate texture data',
      'GC pressure from redundant immutable data',
      'Cannot share safely without a registry',
    ],
    withPatternWins: [
      'Intrinsic state (glyph) shared in a factory/cache',
      'Extrinsic state (x, y) stored per instance',
      'Huge memory savings for repeated fine-grained objects',
    ],
    codeTakeaway:
      'Flyweight shares the heavy repeated part. Many characters point to one shared Glyph object.',
    tryItSteps: [
      'Run ▶ — two characters share the same glyph object (same reference).',
    ],
    codeBeforeHint: 'Every character stores its own heavy glyph data.',
    codeAfterHint: 'Glyph factory shares one object for repeated letters.',
    runDemo: `class Glyph {
    final String shape;
    Glyph(String shape) { this.shape = shape; }
}

class GlyphFactory {
    private final java.util.Map<String, Glyph> cache = new java.util.HashMap<>();
    Glyph get(String s) {
        return cache.computeIfAbsent(s, Glyph::new);
    }
}

class CharAt {
    final Glyph glyph;
    final int x;
    CharAt(Glyph g, int x) { glyph = g; this.x = x; }
}

public class FlyweightDemo {
    public static void main(String[] args) {
        GlyphFactory factory = new GlyphFactory();
        CharAt a = new CharAt(factory.get("A"), 1);
        CharAt b = new CharAt(factory.get("A"), 5);
        System.out.println(a.glyph.shape + " at " + a.x);
        System.out.println("Shared glyph? " + (a.glyph == b.glyph));
    }
}`,
  },

  proxy: {
    sceneSteps: [
      'Your assistant screens calls before they reach you',
      'Spam gets blocked; real clients get through',
      'Caller still thinks they reached you — proxy stood in front',
    ],
    withoutPatternPains: [
      'Heavy image loaded on every page scroll',
      'Access checks duplicated before every sensitive call',
      'Remote service details leak into business code',
    ],
    withPatternWins: [
      'Proxy lazy-loads or caches the real object',
      'Security, logging, or rate limits live in one place',
      'Client uses same interface as the real subject',
    ],
    codeTakeaway:
      'Proxy looks like the real object but controls access: load late, check permissions, or call remote service.',
    tryItSteps: [
      'Run ▶ — proxy loads real image only on first display().',
    ],
    codeBeforeHint: 'Client hits expensive resource directly every time.',
    codeAfterHint: 'Proxy defers work until actually needed.',
    runDemo: `interface Image { void display(); }

class RealImage implements Image {
    RealImage() { System.out.println("Loading HD image from disk..."); }
    public void display() { System.out.println("Showing image"); }
}

class ImageProxy implements Image {
    private RealImage real;
    public void display() {
        if (real == null) real = new RealImage();
        real.display();
    }
}

public class ProxyDemo {
    public static void main(String[] args) {
        Image img = new ImageProxy();
        System.out.println("Page rendered (image not loaded yet)");
        img.display();
    }
}`,
  },

  'chain-of-responsibility': {
    sceneSteps: [
      'Your support ticket starts at Level 1 chat',
      'Simple issues stop there; hard ones escalate to engineering',
      'You never pick the agent — the chain routes your request',
    ],
    withoutPatternPains: [
      'Giant if/else in dispatcher knows every handler',
      'New tier = edit the central routing method',
      'Handlers cannot be reordered without code changes',
    ],
    withPatternWins: [
      'Each handler tries or passes to next link',
      'Build chain at runtime: L1 → L2 → Eng',
      'Sender only talks to the first handler',
    ],
    codeTakeaway:
      'Chain removes central routing if/else. Each handler decides: handle it or forward.',
    tryItSteps: [
      'Run ▶ — low priority handled by L1; high priority reaches engineering.',
    ],
    codeBeforeHint: 'One method knows every handler and priority rule.',
    codeAfterHint: 'Handlers linked — each processes or forwards.',
    runDemo: `abstract class Handler {
    private Handler next;
    Handler link(Handler n) { next = n; return n; }
    void handle(int priority, String issue) {
        if (canHandle(priority)) resolve(issue);
        else if (next != null) next.handle(priority, issue);
    }
    abstract boolean canHandle(int p);
    abstract void resolve(String issue);
}

class L1 extends Handler {
    boolean canHandle(int p) { return p <= 1; }
    void resolve(String issue) { System.out.println("L1 fixed: " + issue); }
}

class Eng extends Handler {
    boolean canHandle(int p) { return p > 1; }
    void resolve(String issue) { System.out.println("Engineering fixed: " + issue); }
}

public class ChainDemo {
    public static void main(String[] args) {
        Handler chain = new L1();
        chain.link(new Eng());
        chain.handle(1, "password reset");
        chain.handle(5, "data corruption");
    }
}`,
  },

  command: {
    sceneSteps: [
      'Waiter writes your order on a ticket — not cooks the food',
      'Kitchen queue holds tickets; chef works when ready',
      'Void or replay a ticket without changing how waiters work',
    ],
    withoutPatternPains: [
      'Button directly calls editor.toggleBold() — no undo',
      'Cannot queue, log, or macro-record actions',
      'UI tightly coupled to business logic',
    ],
    withPatternWins: [
      'Each action is a Command object with execute/undo',
      'Invoker stores history stack for undo',
      'Same button can run different commands at runtime',
    ],
    codeTakeaway:
      'Command turns "do bold" into an object you can push on a stack and undo later.',
    tryItSteps: [
      'Run ▶ — bold toggles on, undo toggles off.',
    ],
    codeBeforeHint: 'Button directly calls receiver — no undo stack.',
    codeAfterHint: 'Command object stored and reversed on undo.',
    runDemo: `interface Command { void execute(); void undo(); }

class Editor {
    boolean bold = false;
    void setBold(boolean b) { bold = b; }
}

class BoldCommand implements Command {
    private final Editor editor;
    BoldCommand(Editor e) { editor = e; }
    public void execute() { editor.setBold(true); }
    public void undo() { editor.setBold(false); }
}

public class CommandDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        Command cmd = new BoldCommand(editor);
        cmd.execute();
        System.out.println("Bold after execute: " + editor.bold);
        cmd.undo();
        System.out.println("Bold after undo: " + editor.bold);
    }
}`,
  },

  interpreter: {
    sceneSteps: [
      'Sheet music uses symbols: each note means something',
      'Musician reads symbols following grammar rules',
      'Performance is interpretation — not one giant if on raw text',
    ],
    withoutPatternPains: [
      'String hacks for AND/OR rules in access control',
      'New operator needs another branch in one huge method',
      'Rules hard to test and compose',
    ],
    withPatternWins: [
      'Each grammar rule is a small Expression class',
      'Compose trees: And(roleAdmin, roleEditor)',
      'interpret(context) evaluates uniformly',
    ],
    codeTakeaway:
      'Interpreter builds a tiny expression tree. Each node knows how to evaluate itself.',
    tryItSteps: [
      'Run ▶ inside the editor.',
      'admin passes adminOnly? true — single role check works.',
      'admin passes adminAndEditor? false — needs BOTH roles on one user (rare).',
    ],
    codeBeforeHint: 'String parsing with nested if/contains.',
    codeAfterHint: 'Composable expression objects evaluate the rule.',
    runDemo: `interface Expression { boolean interpret(User user); }

class User {
    final String role;
    User(String role) { this.role = role; }
}

class RoleExpr implements Expression {
    private final String need;
    RoleExpr(String need) { this.need = need; }
    public boolean interpret(User user) { return user.role.equals(need); }
}

class AndExpr implements Expression {
    private final Expression a, b;
    AndExpr(Expression a, Expression b) { this.a = a; this.b = b; }
    public boolean interpret(User user) { return a.interpret(user) && b.interpret(user); }
}

public class InterpreterDemo {
    public static void main(String[] args) {
        Expression adminOnly = new RoleExpr("admin");
        User admin = new User("admin");
        User guest = new User("guest");
        System.out.println("admin passes adminOnly? " + adminOnly.interpret(admin));
        System.out.println("guest passes adminOnly? " + adminOnly.interpret(guest));
    }
}`,
  },

  iterator: {
    sceneSteps: [
      'You browse a playlist with next/previous — not peeking at internal array',
      'Playlist could be array, linked list, or streaming — same buttons work',
      'You traverse without knowing how songs are stored',
    ],
    withoutPatternPains: [
      'Client uses get(i) and knows internal array layout',
      'Cannot swap backing storage without breaking callers',
      'Multiple traversal styles duplicated everywhere',
    ],
    withPatternWins: [
      'Iterator exposes hasNext/next — hides collection internals',
      'Multiple iterators over same collection',
      'Uniform foreach-style traversal',
    ],
    codeTakeaway:
      'Iterator gives a cursor. Client walks with next() without touching the backing list structure.',
    tryItSteps: [
      'Run ▶ — prints playlist items one per line via iterator.',
    ],
    codeBeforeHint: 'Client indexes into raw array — tied to implementation.',
    codeAfterHint: 'Iterator hides whether backing store is list or array.',
    runDemo: `class Playlist {
    private final String[] songs = {"Intro", "Verse", "Chorus"};
    java.util.Iterator<String> iterator() {
        return java.util.Arrays.asList(songs).iterator();
    }
}

public class IteratorDemo {
    public static void main(String[] args) {
        Playlist p = new Playlist();
        java.util.Iterator<String> it = p.iterator();
        while (it.hasNext()) System.out.println("Now playing: " + it.next());
    }
}`,
  },

  mediator: {
    sceneSteps: [
      'Air traffic control — pilots don\'t negotiate paths with every other plane',
      'Each pilot talks to the tower; tower coordinates everyone',
      'Chaos avoided: no web of direct plane-to-plane calls',
    ],
    withoutPatternPains: [
      'Chat UI components reference each other directly',
      'Adding a widget means wiring it to every other widget',
      'Hard to reuse components in another screen',
    ],
    withPatternWins: [
      'Mediator owns routing between colleagues',
      'Colleagues only know the mediator interface',
      'Central place to change interaction rules',
    ],
    codeTakeaway:
      'Mediator is the hub. Components send messages to mediator; mediator forwards — no spaghetti references.',
    tryItSteps: [
      'Run ▶ — Alice message reaches Bob only through chat room mediator.',
    ],
    codeBeforeHint: 'Every widget holds references to every other widget.',
    codeAfterHint: 'Widgets talk to mediator; mediator routes messages.',
    runDemo: `class ChatRoom {
    void show(String from, String to, String msg) {
        System.out.println(from + " -> " + to + ": " + msg);
    }
}

class User {
    private final String name;
    private final ChatRoom room;
    User(String name, ChatRoom room) { this.name = name; this.room = room; }
    void send(User to, String msg) { room.show(name, to.name, msg); }
}

public class MediatorDemo {
    public static void main(String[] args) {
        ChatRoom room = new ChatRoom();
        User alice = new User("Alice", room);
        User bob = new User("Bob", room);
        alice.send(bob, "Meeting at 3?");
    }
}`,
  },

  memento: {
    sceneSteps: [
      'You save a video game checkpoint before a boss fight',
      'Lose the fight — reload and you\'re back at the checkpoint',
      'Save file holds state; game restores without exposing internals',
    ],
    withoutPatternPains: [
      'Public fields copied manually for undo — breaks encapsulation',
      'Caretaker can corrupt originator state',
      'Undo logic scattered across UI',
    ],
    withPatternWins: [
      'Originator creates opaque Memento snapshots',
      'Caretaker stores mementos; only originator restores',
      'Clean undo/redo stacks',
    ],
    codeTakeaway:
      'Memento packages private state into a snapshot object only the editor can read back.',
    tryItSteps: [
      'Run ▶ — text changes, undo restores previous text.',
    ],
    codeBeforeHint: 'Caretaker copies public fields — fragile undo.',
    codeAfterHint: 'Opaque snapshot — only originator restores state.',
    runDemo: `class Editor {
    private String text = "hello";
    void type(String t) { text = t; }
    String getText() { return text; }
    String save() { return text; }
    void restore(String m) { text = m; }
}

public class MementoDemo {
    public static void main(String[] args) {
        Editor e = new Editor();
        String snapshot = e.save();
        e.type("hello world");
        System.out.println("After edit: " + e.getText());
        e.restore(snapshot);
        System.out.println("After undo: " + e.getText());
    }
}`,
  },

  observer: {
    sceneSteps: [
      'You subscribe to a food blog newsletter',
      'The blog publishes a new recipe',
      'You get an email instantly — no need to keep refreshing the site',
    ],
    withoutPatternPains: [
      'OrderStatus must know about email, SMS, analytics, and every future channel',
      'Adding push notifications means editing OrderStatus again',
      'You cannot test "send email" without the whole class',
    ],
    withPatternWins: [
      'OrderStatus only says "status changed" — listeners decide what to do',
      'New listener? Subscribe it — no change to OrderStatus',
      'Each listener is a small class you can test alone',
    ],
    codeTakeaway:
      'Compare tabs: without Observer, setStatus() is a growing list of services. With Observer, it loops subscribers — that\'s the trick.',
    tryItSteps: [
      'Wait for the editor, click Run ▶ inside the dark box.',
      'You should see Email and SMS lines when status becomes SHIPPED.',
      'Add order.subscribe(s -> System.out.println("Push: " + s)); and Run again.',
    ],
    codeBeforeHint: 'Subject hard-codes every listener inside setStatus().',
    codeAfterHint: 'Subject notifies subscribed observers — add listeners without editing subject.',
    runDemo: `import java.util.ArrayList;
import java.util.List;

interface OrderObserver {
    void onStatusChanged(String status);
}

class OrderStatus {
    private final List<OrderObserver> observers = new ArrayList<>();

    void subscribe(OrderObserver observer) {
        observers.add(observer);
    }

    void setStatus(String status) {
        System.out.println("Order status is now: " + status);
        for (OrderObserver observer : observers) {
            observer.onStatusChanged(status);
        }
    }
}

public class ObserverDemo {
    public static void main(String[] args) {
        OrderStatus order = new OrderStatus();
        order.subscribe(s -> System.out.println("Email: shipped " + s));
        order.subscribe(s -> System.out.println("SMS: shipped " + s));
        order.setStatus("SHIPPED");
    }
}`,
  },

  state: {
    sceneSteps: [
      'Traffic light: green → yellow → red → green',
      'Same light hardware, different rules per color',
      'Behavior changes with current state — not one class full of ifs',
    ],
    withoutPatternPains: [
      'Order class: if shipped else if paid else if new…',
      'New status means editing every transition method',
      'Invalid transitions easy to introduce',
    ],
    withPatternWins: [
      'Each state class implements allowed transitions',
      'Context delegates to current state object',
      'Add state = new class, not bigger switch',
    ],
    codeTakeaway:
      'State replaces status if/else. Context calls state.onPay(); PaidState vs NewState behave differently.',
    tryItSteps: [
      'Run ▶ — pay moves NEW→PAID, ship moves PAID→SHIPPED.',
    ],
    codeBeforeHint: 'One class with enum/status if chains.',
    codeAfterHint: 'State objects encapsulate behavior per status.',
    runDemo: `interface OrderState {
    void pay(Order ctx);
    void ship(Order ctx);
}

class NewState implements OrderState {
    public void pay(Order ctx) { System.out.println("Paid"); ctx.setState(new PaidState()); }
    public void ship(Order ctx) { System.out.println("Cannot ship unpaid"); }
}

class PaidState implements OrderState {
    public void pay(Order ctx) { System.out.println("Already paid"); }
    public void ship(Order ctx) { System.out.println("Shipped"); ctx.setState(new ShippedState()); }
}

class ShippedState implements OrderState {
    public void pay(Order ctx) { System.out.println("Already shipped"); }
    public void ship(Order ctx) { System.out.println("Already shipped"); }
}

class Order {
    private OrderState state = new NewState();
    void setState(OrderState s) { state = s; }
    void pay() { state.pay(this); }
    void ship() { state.ship(this); }
}

public class StateDemo {
    public static void main(String[] args) {
        Order o = new Order();
        o.pay();
        o.ship();
    }
}`,
  },

  strategy: {
    sceneSteps: [
      'Checkout: you pick credit card, UPI, or cash at payment time',
      'Same "pay" button — different processing behind it',
      'Swap payment method without rewriting the checkout screen',
    ],
    withoutPatternPains: [
      'pay() switches on string "card"/"upi"/"cash"',
      'New payment provider = another elseif branch',
      'Cannot swap algorithm at runtime easily',
    ],
    withPatternWins: [
      'PaymentStrategy interface; checkout holds one strategy',
      'User picks strategy at runtime',
      'Each algorithm in its own class — easy to test',
    ],
    codeTakeaway:
      'Strategy vs State: Strategy is interchangeable algorithms (payment types). State is lifecycle phases that change the object.',
    tryItSteps: [
      'Run ▶ — card then UPI lines with same checkout.pay().',
      'Change strategy before pay() and Run again.',
    ],
    codeBeforeHint: 'One method with payment-type if/else.',
    codeAfterHint: 'Checkout delegates to interchangeable strategy objects.',
    runDemo: `interface PaymentStrategy {
    void pay(int amount);
}

class CardStrategy implements PaymentStrategy {
    public void pay(int amount) { System.out.println("Card paid " + amount); }
}

class UpiStrategy implements PaymentStrategy {
    public void pay(int amount) { System.out.println("UPI paid " + amount); }
}

class Checkout {
    private PaymentStrategy strategy;
    Checkout(PaymentStrategy strategy) { this.strategy = strategy; }
    void pay(int amount) { strategy.pay(amount); }
}

public class StrategyDemo {
    public static void main(String[] args) {
        Checkout c = new Checkout(new CardStrategy());
        c.pay(100);
        c = new Checkout(new UpiStrategy());
        c.pay(250);
    }
}`,
  },

  'template-method': {
    sceneSteps: [
      'Making tea and coffee: both heat water, but brew steps differ',
      'Recipe skeleton is fixed; only brew/pour steps change',
      'Same workflow structure — subclasses fill in the unique parts',
    ],
    withoutPatternPains: [
      'Duplicate prepare() in TeaMaker and CoffeeMaker',
      'Fixing heat-water bug means editing multiple classes',
      'Hooks not obvious — easy to skip a step',
    ],
    withPatternWins: [
      'Abstract class defines templateMethod() calling fixed steps',
      'Subclasses override only brew() or addInserts()',
      'Invariant order enforced in one place',
    ],
    codeTakeaway:
      'Template Method owns the sequence. Subclasses override steps, not the overall algorithm order.',
    tryItSteps: [
      'Run ▶ — tea and coffee both follow heat→brew→pour, different brew lines.',
    ],
    codeBeforeHint: 'Duplicated workflow in sibling classes.',
    codeAfterHint: 'Parent defines steps; children override hooks only.',
    runDemo: `abstract class Beverage {
    final void prepare() {
        heatWater();
        brew();
        pour();
    }
    private void heatWater() { System.out.println("Heating water"); }
    abstract void brew();
    private void pour() { System.out.println("Pouring into cup"); }
}

class Tea extends Beverage {
    void brew() { System.out.println("Steeping tea"); }
}

class Coffee extends Beverage {
    void brew() { System.out.println("Dripping coffee"); }
}

public class TemplateDemo {
    public static void main(String[] args) {
        new Tea().prepare();
        new Coffee().prepare();
    }
}`,
  },

  visitor: {
    sceneSteps: [
      'Tax auditor visits each department — same visitor, different forms per dept',
      'HR, warehouse, sales each accept visitor and show their books',
      'New audit rule = new visitor, departments unchanged',
    ],
    withoutPatternPains: [
      'Export PDF/JSON/XML methods added to every node class',
      'New operation forces edits across entire object structure',
      'Node classes bloated with unrelated algorithms',
    ],
    withPatternWins: [
      'Visitor defines visitHR(), visitSales() — double dispatch',
      'Add TaxVisitor or ExportVisitor without changing nodes',
      'Operations live in visitor classes',
    ],
    codeTakeaway:
      'Visitor separates "operation" from "object structure." node.accept(visitor) calls the right visit method.',
    tryItSteps: [
      'Run ▶ — visitor prints different lines for circle vs square.',
    ],
    codeBeforeHint: 'Every shape class grows export/tax methods.',
    codeAfterHint: 'Visitor class holds operations; shapes just accept(visitor).',
    runDemo: `interface Shape { void accept(ShapeVisitor v); }
interface ShapeVisitor {
    void visitCircle(Circle c);
    void visitSquare(Square s);
}

class Circle implements Shape {
    public void accept(ShapeVisitor v) { v.visitCircle(this); }
}

class Square implements Shape {
    public void accept(ShapeVisitor v) { v.visitSquare(this); }
}

class AreaVisitor implements ShapeVisitor {
    public void visitCircle(Circle c) { System.out.println("Circle area"); }
    public void visitSquare(Square s) { System.out.println("Square area"); }
}

public class VisitorDemo {
    public static void main(String[] args) {
        ShapeVisitor v = new AreaVisitor();
        new Circle().accept(v);
        new Square().accept(v);
    }
}`,
  },
};
