/**
 * Single source of truth for complete, runnable Java examples for all 23 GoF patterns.
 * Every codeBefore and codeAfter is a COMPLETE single-file Java program with a
 * public class + main(), copy-paste ready for OneCompiler. runDemo mirrors codeAfter.
 * Each pattern uses the SAME real-life example thread as pattern-stories.ts.
 */
export interface PatternCode {
  codeBefore: string;
  codeAfter: string;
  runDemo: string;
}

/** runDemo is always an exact copy of codeAfter. */
function withDemo(codeBefore: string, codeAfter: string): PatternCode {
  return { codeBefore, codeAfter, runDemo: codeAfter };
}

export const patternCode: Record<string, PatternCode> = {
  // Home Wi-Fi / AppConfig theme settings
  singleton: withDemo(
    `// PROBLEM: every service does "new AppConfig()" -> its own copy.
// Like every room installing its own Wi-Fi router with its own password.
class AppConfig {
    String theme = "light";
}

class ThemeService {
    void apply(AppConfig config) {
        config.theme = "dark";
        System.out.println("ThemeService set theme: " + config.theme);
    }
}

class ApiService {
    void render(AppConfig config) {
        System.out.println("ApiService sees theme: " + config.theme);
    }
}

public class SingletonProblemDemo {
    public static void main(String[] args) {
        new ThemeService().apply(new AppConfig());   // router #1: set dark
        new ApiService().render(new AppConfig());    // router #2: still light!
        // Two objects, two "sources of truth" -> theme mismatch.
    }
}`,
    `// FIX: ONE router, one SSID. getInstance() is the only door to AppConfig.
class AppConfig {
    private static AppConfig instance;
    private String theme = "light";

    private AppConfig() {}                            // no "new" from outside

    static AppConfig getInstance() {                  // the single shared network
        if (instance == null) instance = new AppConfig();
        return instance;
    }
    void setTheme(String theme) { this.theme = theme; }
    String getTheme() { return theme; }
}

class ThemeService {
    void apply() {
        AppConfig.getInstance().setTheme("dark");
        System.out.println("ThemeService set theme: dark");
    }
}

class ApiService {
    void render() {
        System.out.println("ApiService sees theme: " + AppConfig.getInstance().getTheme());
    }
}

public class SingletonDemo {
    public static void main(String[] args) {
        new ThemeService().apply();                   // sets dark on shared config
        new ApiService().render();                    // reads "dark" — same object
        System.out.println("Same instance? " +
            (AppConfig.getInstance() == AppConfig.getInstance()));
    }
}`
  ),

  // Coffee shop ordering
  factory: withDemo(
    `// PROBLEM: every customer repeats the same if/else in the kitchen.
class Espresso { Espresso() { System.out.println("Made an Espresso"); } }
class Latte    { Latte()    { System.out.println("Made a Latte");    } }

class Customer {
    void order(String type) {
        // Kitchen logic leaks into every caller.
        if (type.equals("espresso")) {
            new Espresso();
        } else if (type.equals("latte")) {
            new Latte();
        } else {
            System.out.println("Unknown drink: " + type);
        }
    }
}

public class CoffeeProblemDemo {
    public static void main(String[] args) {
        new Customer().order("espresso");
        new Customer().order("latte");
        // Add a new drink -> edit if/else in EVERY customer.
    }
}`,
    `// FIX: the CoffeeShop factory decides which object to build.
interface Coffee { void prepare(); }

class Espresso implements Coffee {
    public void prepare() { System.out.println("Made an Espresso"); }
}
class Latte implements Coffee {
    public void prepare() { System.out.println("Made a Latte"); }
}

class CoffeeShop {
    static Coffee order(String type) {              // one place to grow
        switch (type) {
            case "espresso": return new Espresso();
            case "latte":    return new Latte();
            default: throw new IllegalArgumentException("Unknown drink: " + type);
        }
    }
}

public class CoffeeShopDemo {
    public static void main(String[] args) {
        CoffeeShop.order("espresso").prepare();
        CoffeeShop.order("latte").prepare();
        // Customers just ask; the shop knows how to make it.
    }
}`
  ),

  // Furniture sets that must match
  'abstract-factory': withDemo(
    `// PROBLEM: nothing forces matching styles -> mismatched room.
class ScandinavianSofa { void show() { System.out.println("Scandinavian sofa"); } }
class ModernLamp      { void show() { System.out.println("Modern lamp");        } }

public class FurnitureProblemDemo {
    public static void main(String[] args) {
        // Hand-picking pieces: easy to mix styles by accident.
        ScandinavianSofa sofa = new ScandinavianSofa();
        ModernLamp lamp = new ModernLamp();          // oops, wrong style!
        sofa.show();
        lamp.show();
        System.out.println("Room looks mismatched: Scandinavian + Modern");
    }
}`,
    `// FIX: a factory makes a whole MATCHED set (sofa + lamp) together.
interface Sofa { void show(); }
interface Lamp { void show(); }

class ScandinavianSofa implements Sofa { public void show() { System.out.println("Scandinavian sofa"); } }
class ScandinavianLamp implements Lamp { public void show() { System.out.println("Scandinavian lamp"); } }
class ModernSofa       implements Sofa { public void show() { System.out.println("Modern sofa"); } }
class ModernLamp       implements Lamp { public void show() { System.out.println("Modern lamp"); } }

interface FurnitureFactory { Sofa createSofa(); Lamp createLamp(); }

class ScandinavianFactory implements FurnitureFactory {
    public Sofa createSofa() { return new ScandinavianSofa(); }
    public Lamp createLamp() { return new ScandinavianLamp(); }
}
class ModernFactory implements FurnitureFactory {
    public Sofa createSofa() { return new ModernSofa(); }
    public Lamp createLamp() { return new ModernLamp(); }
}

public class FurnitureDemo {
    static void furnishRoom(FurnitureFactory factory) {
        factory.createSofa().show();
        factory.createLamp().show();
    }
    public static void main(String[] args) {
        System.out.println("-- Scandinavian room --");
        furnishRoom(new ScandinavianFactory());       // always matches
        System.out.println("-- Modern room --");
        furnishRoom(new ModernFactory());
    }
}`
  ),

  // Burrito builder
  builder: withDemo(
    `// PROBLEM: a giant constructor with a wall of arguments.
class Burrito {
    Burrito(String size, boolean rice, boolean beans, boolean cheese,
            boolean salsa, boolean guac, boolean sourCream) {
        System.out.println("Burrito: " + size +
            " rice=" + rice + " beans=" + beans + " cheese=" + cheese +
            " salsa=" + salsa + " guac=" + guac + " sourCream=" + sourCream);
    }
}

public class BurritoProblemDemo {
    public static void main(String[] args) {
        // Which boolean is which? Easy to swap salsa and guac by mistake.
        new Burrito("large", true, true, false, true, true, false);
    }
}`,
    `// FIX: a fluent Builder — name each choice, add only what you want.
class Burrito {
    private final String description;
    private Burrito(String description) { this.description = description; }
    void print() { System.out.println(description); }

    static class Builder {
        private String size = "regular";
        private StringBuilder items = new StringBuilder();
        Builder size(String s)   { this.size = s; return this; }
        Builder add(String item) { items.append(item).append(" "); return this; }
        Burrito build() { return new Burrito("Burrito(" + size + "): " + items.toString().trim()); }
    }
}

public class BurritoDemo {
    public static void main(String[] args) {
        Burrito b = new Burrito.Builder()
            .size("large")
            .add("rice").add("beans").add("cheese").add("guac")
            .build();                                  // readable, order-proof
        b.print();
    }
}`
  ),

  // Google Doc copy
  prototype: withDemo(
    `// PROBLEM: copying a doc by hand forgets fields -> tags lost.
class Document {
    String title;
    String body;
    String tags;
    Document(String title, String body, String tags) {
        this.title = title; this.body = body; this.tags = tags;
    }
    void print() { System.out.println(title + " | " + body + " | tags=" + tags); }
}

public class DocProblemDemo {
    public static void main(String[] args) {
        Document original = new Document("Q3 Plan", "content...", "work,urgent");
        // Manual "copy": someone forgets to carry over the tags.
        Document copy = new Document(original.title + " (copy)", original.body, null);
        original.print();
        copy.print();                                  // tags=null — data lost!
    }
}`,
    `// FIX: the object knows how to clone itself — nothing forgotten.
class Document {
    String title;
    String body;
    String tags;
    Document(String title, String body, String tags) {
        this.title = title; this.body = body; this.tags = tags;
    }
    Document copy() {                                  // clones every field
        return new Document(title + " (copy)", body, tags);
    }
    void print() { System.out.println(title + " | " + body + " | tags=" + tags); }
}

public class DocDemo {
    public static void main(String[] args) {
        Document original = new Document("Q3 Plan", "content...", "work,urgent");
        Document copy = original.copy();               // tags carried automatically
        original.print();
        copy.print();
    }
}`
  ),

  // USB-C dongle -> HDMI projector
  adapter: withDemo(
    `// PROBLEM: the projector speaks HDMI; the laptop only has USB-C.
// Every caller writes the same glue to bridge the mismatch.
class HdmiProjector {
    void displayHdmi(String hdmiSignal) {
        System.out.println("Projector shows: " + hdmiSignal);
    }
}

class Laptop {
    // Laptop outputs a USB-C signal but must translate it inline, everywhere.
    void present(String usbcSignal, HdmiProjector projector) {
        String hdmiSignal = "HDMI[" + usbcSignal + "]";   // glue code repeated
        projector.displayHdmi(hdmiSignal);
    }
}

public class DongleProblemDemo {
    public static void main(String[] args) {
        HdmiProjector projector = new HdmiProjector();
        new Laptop().present("slides.usbc", projector);   // conversion leaks here
        new Laptop().present("video.usbc", projector);    // ...and here again
    }
}`,
    `// FIX: a USB-C -> HDMI adapter wraps the projector once.
interface UsbCDisplay { void display(String usbcSignal); }   // what the laptop expects

class HdmiProjector {                                        // the incompatible device
    void displayHdmi(String hdmiSignal) {
        System.out.println("Projector shows: " + hdmiSignal);
    }
}

class UsbCtoHdmiAdapter implements UsbCDisplay {
    private final HdmiProjector projector;
    UsbCtoHdmiAdapter(HdmiProjector projector) { this.projector = projector; }
    public void display(String usbcSignal) {                 // conversion in one place
        projector.displayHdmi("HDMI[" + usbcSignal + "]");
    }
}

class Laptop {
    void present(String usbcSignal, UsbCDisplay display) {
        display.display(usbcSignal);                         // no glue in the caller
    }
}

public class DongleDemo {
    public static void main(String[] args) {
        UsbCDisplay display = new UsbCtoHdmiAdapter(new HdmiProjector());
        new Laptop().present("slides.usbc", display);
        new Laptop().present("video.usbc", display);
    }
}`
  ),

  // TV remote: class explosion
  bridge: withDemo(
    `// PROBLEM: class explosion. Each remote type x each brand = a new class.
// 2 remote types (Basic, Advanced) x 2 brands (Sony, Samsung) = 4 classes.
class SonyBasicRemote     { void power() { System.out.println("Sony: power toggled"); } }
class SonyAdvancedRemote  { void power() { System.out.println("Sony: power toggled"); }
                            void mute()  { System.out.println("Sony: muted"); } }
class SamsungBasicRemote  { void power() { System.out.println("Samsung: power toggled"); } }
class SamsungAdvancedRemote { void power() { System.out.println("Samsung: power toggled"); }
                              void mute()  { System.out.println("Samsung: muted"); } }

public class RemoteProblemDemo {
    public static void main(String[] args) {
        new SonyBasicRemote().power();
        new SamsungAdvancedRemote().mute();
        int remoteTypes = 2, brands = 2;
        System.out.println("Classes needed = " + (remoteTypes * brands)); // 4
        System.out.println("Add LG -> now " + (remoteTypes * 3) + " classes");
    }
}`,
    `// FIX: split the two axes. Remote (abstraction) bridges to TV (implementation).
interface TV {                                       // implementation axis: brands
    void on();
    void off();
}
class SonyTV    implements TV { public void on() { System.out.println("Sony TV on"); }
                                public void off() { System.out.println("Sony TV off"); } }
class SamsungTV implements TV { public void on() { System.out.println("Samsung TV on"); }
                                public void off() { System.out.println("Samsung TV off"); } }
class LGTV      implements TV { public void on() { System.out.println("LG TV on"); }
                                public void off() { System.out.println("LG TV off"); } }

class Remote {                                       // abstraction axis: remote types
    protected final TV tv;
    Remote(TV tv) { this.tv = tv; }
    void power() { tv.on(); }
}
class AdvancedRemote extends Remote {                // extends without touching brands
    AdvancedRemote(TV tv) { super(tv); }
    void mute() { tv.off(); System.out.println("(muted)"); }
}

public class RemoteDemo {
    public static void main(String[] args) {
        new Remote(new SonyTV()).power();
        new AdvancedRemote(new SamsungTV()).mute();
        new Remote(new LGTV()).power();              // adding LG = ONE class only
        System.out.println("Classes = 3 brands + 2 remotes = 5, not 6");
    }
}`
  ),

  // Project folder tree
  composite: withDemo(
    `// PROBLEM: every operation branches on instanceof File vs Folder.
import java.util.*;

class File   { String name; File(String n){ name = n; } }
class Folder { String name; List<Object> children = new ArrayList<>(); Folder(String n){ name = n; } }

public class ProjectProblemDemo {
    static int size(Object node) {
        if (node instanceof File) {
            return 1;
        } else if (node instanceof Folder) {          // must handle each type
            int total = 0;
            for (Object child : ((Folder) node).children) {
                total += size(child);                  // recursion + instanceof everywhere
            }
            return total;
        }
        return 0;
    }
    public static void main(String[] args) {
        Folder root = new Folder("project");
        root.children.add(new File("readme.md"));
        Folder src = new Folder("src");
        src.children.add(new File("main.java"));
        root.children.add(src);
        System.out.println("Files: " + size(root));    // add ops -> more instanceof
    }
}`,
    `// FIX: File and Folder share one interface; a folder delegates to children.
import java.util.*;

interface Node { int size(); }                         // leaf and branch look the same

class File implements Node {
    private final String name;
    File(String name) { this.name = name; }
    public int size() { return 1; }
}

class Folder implements Node {
    private final String name;
    private final List<Node> children = new ArrayList<>();
    Folder(String name) { this.name = name; }
    Folder add(Node node) { children.add(node); return this; }
    public int size() {                                // no instanceof — just ask
        int total = 0;
        for (Node child : children) total += child.size();
        return total;
    }
}

public class ProjectDemo {
    public static void main(String[] args) {
        Folder root = new Folder("project")
            .add(new File("readme.md"))
            .add(new Folder("src").add(new File("main.java")));
        System.out.println("Files: " + root.size());  // whole tree, one call
    }
}`
  ),

  // Insurance add-ons
  decorator: withDemo(
    `// PROBLEM: a subclass for every combination of add-ons.
class BasicHealth { double cost() { return 100; } }
class HealthWithDental extends BasicHealth {
    double cost() { return super.cost() + 20; }
}
class HealthDentalVision extends HealthWithDental {    // and Health+Vision? +Vision+Dental?
    double cost() { return super.cost() + 15; }
}

public class InsuranceProblemDemo {
    public static void main(String[] args) {
        System.out.println("Basic: " + new BasicHealth().cost());
        System.out.println("+Dental: " + new HealthWithDental().cost());
        System.out.println("+Dental+Vision: " + new HealthDentalVision().cost());
        // N add-ons -> 2^N subclasses. Combinatorial explosion.
    }
}`,
    `// FIX: stack add-on decorators onto a base policy at runtime.
interface Policy { double cost(); String describe(); }

class BasicHealth implements Policy {
    public double cost() { return 100; }
    public String describe() { return "Basic health"; }
}

abstract class AddonDecorator implements Policy {
    protected final Policy wrapped;
    AddonDecorator(Policy wrapped) { this.wrapped = wrapped; }
}

class Dental extends AddonDecorator {
    Dental(Policy p) { super(p); }
    public double cost() { return wrapped.cost() + 20; }
    public String describe() { return wrapped.describe() + " + dental"; }
}
class Vision extends AddonDecorator {
    Vision(Policy p) { super(p); }
    public double cost() { return wrapped.cost() + 15; }
    public String describe() { return wrapped.describe() + " + vision"; }
}

public class InsuranceDemo {
    public static void main(String[] args) {
        Policy plan = new Vision(new Dental(new BasicHealth())); // mix freely
        System.out.println(plan.describe() + " = " + plan.cost());
    }
}`
  ),

  // Food delivery app facade
  facade: withDemo(
    `// PROBLEM: the UI wires together Kitchen, Payment and Delivery itself.
class Kitchen  { void cook(String item) { System.out.println("Cooking " + item); } }
class Payment  { boolean charge(double amt) { System.out.println("Charged $" + amt); return true; } }
class Delivery { void dispatch(String item) { System.out.println("Rider dispatched with " + item); } }

public class FoodProblemDemo {
    public static void main(String[] args) {
        // Every screen must know the exact sequence and all three subsystems.
        Kitchen kitchen = new Kitchen();
        Payment payment = new Payment();
        Delivery delivery = new Delivery();

        payment.charge(12.5);
        kitchen.cook("Pizza");
        delivery.dispatch("Pizza");                    // repeat this everywhere
    }
}`,
    `// FIX: OrderFacade exposes one placeOrder() and hides the subsystems.
class Kitchen  { void cook(String item) { System.out.println("Cooking " + item); } }
class Payment  { boolean charge(double amt) { System.out.println("Charged $" + amt); return true; } }
class Delivery { void dispatch(String item) { System.out.println("Rider dispatched with " + item); } }

class OrderFacade {
    private final Kitchen kitchen = new Kitchen();
    private final Payment payment = new Payment();
    private final Delivery delivery = new Delivery();

    void placeOrder(String item, double amount) {      // one simple entry point
        if (payment.charge(amount)) {
            kitchen.cook(item);
            delivery.dispatch(item);
        }
    }
}

public class FoodDemo {
    public static void main(String[] args) {
        new OrderFacade().placeOrder("Pizza", 12.5);   // UI stays simple
    }
}`
  ),

  // Forest of trees
  flyweight: withDemo(
    `// PROBLEM: every tree stores its own copy of a heavy sprite.
import java.util.*;

class Tree {
    int x, y;
    String sprite;                                     // big shared data, duplicated
    Tree(int x, int y, String sprite) { this.x = x; this.y = y; this.sprite = sprite; }
}

public class ForestProblemDemo {
    public static void main(String[] args) {
        List<Tree> forest = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            forest.add(new Tree(i, i, "OAK_SPRITE_2MB")); // 5 copies of the same sprite
        }
        System.out.println("Trees: " + forest.size());
        System.out.println("Sprite copies in memory: " + forest.size()); // wasteful
    }
}`,
    `// FIX: share one TreeType; each tree keeps only its position.
import java.util.*;

class TreeType {                                       // shared, heavy, immutable
    final String sprite;
    TreeType(String sprite) { this.sprite = sprite; }
}

class TreeFactory {
    private static final Map<String, TreeType> cache = new HashMap<>();
    static TreeType get(String name) {                 // reuse existing types
        return cache.computeIfAbsent(name, TreeType::new);
    }
    static int typeCount() { return cache.size(); }
}

class Tree {
    final int x, y;
    final TreeType type;                               // reference, not a copy
    Tree(int x, int y, TreeType type) { this.x = x; this.y = y; this.type = type; }
}

public class ForestDemo {
    public static void main(String[] args) {
        List<Tree> forest = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            forest.add(new Tree(i, i, TreeFactory.get("OAK"))); // all share one type
        }
        System.out.println("Trees: " + forest.size());
        System.out.println("Sprite copies in memory: " + TreeFactory.typeCount()); // 1
    }
}`
  ),

  // Netflix thumbnail lazy loading
  proxy: withDemo(
    `// PROBLEM: RealImage loads the file in its constructor, even if unused.
class RealImage {
    private final String file;
    RealImage(String file) {
        this.file = file;
        System.out.println("Loading heavy image from disk: " + file); // eager!
    }
    void display() { System.out.println("Displaying " + file); }
}

public class NetflixProblemDemo {
    public static void main(String[] args) {
        // Building the gallery loads EVERY thumbnail up front...
        RealImage a = new RealImage("show1.jpg");
        RealImage b = new RealImage("show2.jpg");      // loaded but never shown
        a.display();                                   // only this one is viewed
    }
}`,
    `// FIX: an ImageProxy defers loading until display() is actually called.
interface Image { void display(); }

class RealImage implements Image {
    private final String file;
    RealImage(String file) {
        this.file = file;
        System.out.println("Loading heavy image from disk: " + file);
    }
    public void display() { System.out.println("Displaying " + file); }
}

class ImageProxy implements Image {
    private final String file;
    private RealImage real;                            // created on first use
    ImageProxy(String file) { this.file = file; }
    public void display() {
        if (real == null) real = new RealImage(file);  // lazy load
        real.display();
    }
}

public class NetflixDemo {
    public static void main(String[] args) {
        Image a = new ImageProxy("show1.jpg");
        Image b = new ImageProxy("show2.jpg");          // NOT loaded yet
        a.display();                                    // loads only show1
        System.out.println("show2 never loaded because it was never viewed");
    }
}`
  ),

  // Support ticket routing
  'chain-of-responsibility': withDemo(
    `// PROBLEM: one method with if/else deciding who handles each priority.
class SupportDesk {
    void handle(String priority) {
        if (priority.equals("low")) {
            System.out.println("Junior handles low ticket");
        } else if (priority.equals("medium")) {
            System.out.println("Senior handles medium ticket");
        } else if (priority.equals("high")) {
            System.out.println("Manager handles high ticket");
        } else {
            System.out.println("Unhandled: " + priority);
        }
    }
}

public class SupportProblemDemo {
    public static void main(String[] args) {
        SupportDesk desk = new SupportDesk();
        desk.handle("low");
        desk.handle("high");
        // New tier -> edit this if/else again.
    }
}`,
    `// FIX: each handler tries, or passes the ticket to the next in the chain.
abstract class Handler {
    protected Handler next;
    Handler setNext(Handler next) { this.next = next; return next; }
    abstract void handle(String priority);
    protected void pass(String priority) {
        if (next != null) next.handle(priority);
        else System.out.println("Unhandled: " + priority);
    }
}

class Junior  extends Handler {
    void handle(String p) { if (p.equals("low")) System.out.println("Junior handles low"); else pass(p); }
}
class Senior  extends Handler {
    void handle(String p) { if (p.equals("medium")) System.out.println("Senior handles medium"); else pass(p); }
}
class Manager extends Handler {
    void handle(String p) { if (p.equals("high")) System.out.println("Manager handles high"); else pass(p); }
}

public class SupportDemo {
    public static void main(String[] args) {
        Handler junior = new Junior();
        junior.setNext(new Senior()).setNext(new Manager()); // build the chain
        junior.handle("low");
        junior.handle("high");                                // walks to Manager
    }
}`
  ),

  // Text editor toolbar
  command: withDemo(
    `// PROBLEM: the toolbar calls editor actions directly — no undo possible.
class Editor {
    boolean bold = false;
    void toggleBold() { bold = !bold; System.out.println("Bold = " + bold); }
}

public class EditorProblemDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        editor.toggleBold();                           // toolbar -> action, hard-wired
        editor.toggleBold();
        // No history object, so no generic undo/redo.
        System.out.println("No way to undo the last action");
    }
}`,
    `// FIX: wrap actions as Command objects and push them on an undo stack.
import java.util.*;

class Editor {
    boolean bold = false;
    void setBold(boolean b) { bold = b; System.out.println("Bold = " + bold); }
}

interface Command { void execute(); void undo(); }

class BoldCommand implements Command {
    private final Editor editor;
    private boolean previous;
    BoldCommand(Editor editor) { this.editor = editor; }
    public void execute() { previous = editor.bold; editor.setBold(!editor.bold); }
    public void undo()    { editor.setBold(previous); }
}

public class EditorDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        Deque<Command> history = new ArrayDeque<>();

        Command c = new BoldCommand(editor);
        c.execute(); history.push(c);                  // record it
        System.out.println("Undo:");
        history.pop().undo();                          // generic undo
    }
}`
  ),

  // App permissions rule
  interpreter: withDemo(
    `// PROBLEM: permission rules parsed by ad-hoc string matching.
public class PermissionProblemDemo {
    static boolean allowed(String rule, String userRole) {
        // Fragile: only understands one hard-coded "A AND B" shape.
        if (rule.contains(" AND ")) {
            String[] parts = rule.split(" AND ");
            return userRole.equals(parts[0].trim()) && userRole.equals(parts[1].trim());
        }
        return userRole.equals(rule.trim());
    }
    public static void main(String[] args) {
        System.out.println(allowed("admin", "admin"));               // true
        System.out.println(allowed("admin AND editor", "admin"));    // false, awkward
        // "admin OR editor"? Nesting? Rewrite the parser each time.
    }
}`,
    `// FIX: model rules as an expression tree you can compose and evaluate.
import java.util.*;

interface Expression { boolean evaluate(Set<String> roles); }

class Role implements Expression {
    private final String role;
    Role(String role) { this.role = role; }
    public boolean evaluate(Set<String> roles) { return roles.contains(role); }
}
class Or implements Expression {
    private final Expression left, right;
    Or(Expression left, Expression right) { this.left = left; this.right = right; }
    public boolean evaluate(Set<String> roles) {
        return left.evaluate(roles) || right.evaluate(roles);
    }
}

public class PermissionDemo {
    public static void main(String[] args) {
        Expression rule = new Or(new Role("admin"), new Role("editor")); // admin OR editor
        Set<String> user = new HashSet<>(Arrays.asList("editor"));
        System.out.println("Allowed? " + rule.evaluate(user));           // true
        // Compose And, nested Or, etc. without touching a parser.
    }
}`
  ),

  // Music playlist iteration
  iterator: withDemo(
    `// PROBLEM: callers loop by index and depend on the array internals.
class Playlist {
    String[] songs = { "Song A", "Song B", "Song C" };
}

public class PlaylistProblemDemo {
    public static void main(String[] args) {
        Playlist playlist = new Playlist();
        // Caller must know it's an array and manage the index itself.
        for (int i = 0; i < playlist.songs.length; i++) {
            System.out.println("Playing " + playlist.songs[i]);
        }
        // Switch to a List or shuffle order -> every loop breaks.
    }
}`,
    `// FIX: expose an iterator; callers step through without knowing storage.
import java.util.*;

class Playlist implements Iterable<String> {
    private final List<String> songs = Arrays.asList("Song A", "Song B", "Song C");
    public Iterator<String> iterator() {               // hides the internal structure
        return songs.iterator();
    }
}

public class PlaylistDemo {
    public static void main(String[] args) {
        Playlist playlist = new Playlist();
        for (String song : playlist) {                 // storage-agnostic loop
            System.out.println("Playing " + song);
        }
    }
}`
  ),

  // Chat room mediator
  mediator: withDemo(
    `// PROBLEM: each user holds references to every other user.
import java.util.*;

class User {
    String name;
    List<User> peers = new ArrayList<>();              // tangled web of references
    User(String name) { this.name = name; }
    void send(String msg) {
        for (User peer : peers) {
            System.out.println(name + " -> " + peer.name + ": " + msg);
        }
    }
}

public class ChatProblemDemo {
    public static void main(String[] args) {
        User a = new User("Alice"), b = new User("Bob"), c = new User("Cara");
        a.peers.addAll(Arrays.asList(b, c));           // wire everyone to everyone
        b.peers.addAll(Arrays.asList(a, c));
        a.send("hi");
        // Add a user -> update every other user's peer list.
    }
}`,
    `// FIX: a ChatRoom mediates; users only know the room.
import java.util.*;

class ChatRoom {
    private final List<User> users = new ArrayList<>();
    void join(User user) { users.add(user); user.room = this; }
    void broadcast(User from, String msg) {            // central hub
        for (User user : users) {
            if (user != from) System.out.println(from.name + " -> " + user.name + ": " + msg);
        }
    }
}

class User {
    String name;
    ChatRoom room;
    User(String name) { this.name = name; }
    void send(String msg) { room.broadcast(this, msg); }
}

public class ChatDemo {
    public static void main(String[] args) {
        ChatRoom room = new ChatRoom();
        User a = new User("Alice"), b = new User("Bob"), c = new User("Cara");
        room.join(a); room.join(b); room.join(c);       // just join the room
        a.send("hi");
    }
}`
  ),

  // Editor undo snapshot
  memento: withDemo(
    `// PROBLEM: backups poke at the editor's public text field directly.
class Editor {
    public String text = "";                            // exposed internal state
}

public class MementoProblemDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        editor.text = "Hello";
        String backup = editor.text;                    // external copy of internals

        editor.text = "Hello, world";
        System.out.println("Now: " + editor.text);

        editor.text = backup;                           // anyone can corrupt state
        System.out.println("Restored: " + editor.text);
    }
}`,
    `// FIX: the editor emits an opaque memento; internals stay private.
class Editor {
    private String text = "";
    void type(String t) { text = t; }
    String read() { return text; }

    Memento save() { return new Memento(text); }        // snapshot
    void restore(Memento m) { text = m.state; }         // rollback

    static class Memento {
        private final String state;                     // encapsulated, read-only
        private Memento(String state) { this.state = state; }
    }
}

public class MementoDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        editor.type("Hello");
        Editor.Memento saved = editor.save();           // no field poking

        editor.type("Hello, world");
        System.out.println("Now: " + editor.read());

        editor.restore(saved);
        System.out.println("Restored: " + editor.read());
    }
}`
  ),

  // Stock price observer
  observer: withDemo(
    `// PROBLEM: the ticker hard-codes every notification channel in setPrice.
class StockTicker {
    double price;
    void setPrice(double price) {
        this.price = price;
        // Every new channel means editing this method.
        System.out.println("SMS: price is " + price);
        System.out.println("Email: price is " + price);
    }
}

public class StockProblemDemo {
    public static void main(String[] args) {
        StockTicker ticker = new StockTicker();
        ticker.setPrice(101.5);
        // Add a "push notification"? Edit setPrice yet again.
    }
}`,
    `// FIX: observers subscribe; setPrice just notifies whoever is listening.
import java.util.*;

interface Observer { void update(double price); }

class StockTicker {
    private final List<Observer> observers = new ArrayList<>();
    private double price;
    void subscribe(Observer o) { observers.add(o); }
    void setPrice(double price) {
        this.price = price;
        for (Observer o : observers) o.update(price);   // no hard-coded channels
    }
}

class SmsAlert   implements Observer { public void update(double p) { System.out.println("SMS: price is " + p); } }
class EmailAlert implements Observer { public void update(double p) { System.out.println("Email: price is " + p); } }

public class StockDemo {
    public static void main(String[] args) {
        StockTicker ticker = new StockTicker();
        ticker.subscribe(new SmsAlert());               // add channels freely
        ticker.subscribe(new EmailAlert());
        ticker.setPrice(101.5);
    }
}`
  ),

  // Vending machine states
  state: withDemo(
    `// PROBLEM: one status field + if/else scattered across every method.
class VendingMachine {
    String status = "NO_COIN";
    void insertCoin() {
        if (status.equals("NO_COIN")) { status = "HAS_COIN"; System.out.println("Coin accepted"); }
        else { System.out.println("Coin already inserted"); }
    }
    void dispense() {
        if (status.equals("HAS_COIN")) { status = "NO_COIN"; System.out.println("Item dispensed"); }
        else { System.out.println("Insert a coin first"); }
    }
}

public class VendingProblemDemo {
    public static void main(String[] args) {
        VendingMachine m = new VendingMachine();
        m.dispense();                                   // "Insert a coin first"
        m.insertCoin();
        m.dispense();
        // Add a "sold out" state -> touch every method's if/else.
    }
}`,
    `// FIX: each state is an object that knows its own transitions.
interface State {
    void insertCoin(VendingMachine m);
    void dispense(VendingMachine m);
}

class NoCoinState implements State {
    public void insertCoin(VendingMachine m) { System.out.println("Coin accepted"); m.setState(new CoinInsertedState()); }
    public void dispense(VendingMachine m)   { System.out.println("Insert a coin first"); }
}
class CoinInsertedState implements State {
    public void insertCoin(VendingMachine m) { System.out.println("Coin already inserted"); }
    public void dispense(VendingMachine m)   { System.out.println("Dispensing..."); m.setState(new DispensingState()); m.dispense(); }
}
class DispensingState implements State {
    public void insertCoin(VendingMachine m) { System.out.println("Please wait, dispensing"); }
    public void dispense(VendingMachine m)   { System.out.println("Item dispensed"); m.setState(new NoCoinState()); }
}

class VendingMachine {
    private State state = new NoCoinState();
    void setState(State state) { this.state = state; }
    void insertCoin() { state.insertCoin(this); }
    void dispense()   { state.dispense(this); }
}

public class VendingDemo {
    public static void main(String[] args) {
        VendingMachine m = new VendingMachine();
        m.dispense();                                   // NoCoin -> "Insert a coin first"
        m.insertCoin();
        m.dispense();                                   // walks through states
    }
}`
  ),

  // Checkout payment strategy
  strategy: withDemo(
    `// PROBLEM: pay() branches on payment type with if/else.
class Checkout {
    void pay(String method, double amount) {
        if (method.equals("card")) {
            System.out.println("Paid $" + amount + " by card");
        } else if (method.equals("upi")) {
            System.out.println("Paid $" + amount + " by UPI");
        } else {
            System.out.println("Unsupported method: " + method);
        }
    }
}

public class CheckoutProblemDemo {
    public static void main(String[] args) {
        Checkout checkout = new Checkout();
        checkout.pay("card", 50);
        checkout.pay("upi", 20);
        // New wallet option -> edit pay() again.
    }
}`,
    `// FIX: each payment method is a pluggable strategy.
interface PaymentStrategy { void pay(double amount); }

class CardPayment implements PaymentStrategy {
    public void pay(double amount) { System.out.println("Paid $" + amount + " by card"); }
}
class UpiPayment implements PaymentStrategy {
    public void pay(double amount) { System.out.println("Paid $" + amount + " by UPI"); }
}

class Checkout {
    private PaymentStrategy strategy;
    void setStrategy(PaymentStrategy strategy) { this.strategy = strategy; }
    void pay(double amount) { strategy.pay(amount); }   // no branching
}

public class CheckoutDemo {
    public static void main(String[] args) {
        Checkout checkout = new Checkout();
        checkout.setStrategy(new CardPayment());
        checkout.pay(50);
        checkout.setStrategy(new UpiPayment());         // swap at runtime
        checkout.pay(20);
    }
}`
  ),

  // Tea / coffee brewing
  'template-method': withDemo(
    `// PROBLEM: Tea and Coffee duplicate the shared heat/pour steps.
class Tea {
    void prepare() {
        System.out.println("Boil water");              // duplicated
        System.out.println("Steep the tea");
        System.out.println("Pour into cup");           // duplicated
    }
}
class Coffee {
    void prepare() {
        System.out.println("Boil water");              // duplicated
        System.out.println("Brew the coffee");
        System.out.println("Pour into cup");           // duplicated
    }
}

public class BeverageProblemDemo {
    public static void main(String[] args) {
        new Tea().prepare();
        new Coffee().prepare();
        // Change "Boil water" -> edit it in both classes.
    }
}`,
    `// FIX: a base class fixes the recipe; subclasses fill in the one varying step.
abstract class Beverage {
    final void prepare() {                              // template method (recipe)
        boilWater();
        brew();                                        // the varying step
        pourInCup();
    }
    private void boilWater() { System.out.println("Boil water"); }
    private void pourInCup() { System.out.println("Pour into cup"); }
    abstract void brew();
}

class Tea extends Beverage {
    void brew() { System.out.println("Steep the tea"); }
}
class Coffee extends Beverage {
    void brew() { System.out.println("Brew the coffee"); }
}

public class BeverageDemo {
    public static void main(String[] args) {
        new Tea().prepare();                            // shared steps live once
        new Coffee().prepare();
    }
}`
  ),

  // Tax auditor visiting departments
  visitor: withDemo(
    `// PROBLEM: every department carries its own exportTax() method.
class HR {
    void exportTax() { System.out.println("HR tax export"); }         // audit logic
}
class Engineering {
    void exportTax() { System.out.println("Engineering tax export"); } // duplicated shape
}
class Sales {
    void exportTax() { System.out.println("Sales tax export"); }
}

public class TaxProblemDemo {
    public static void main(String[] args) {
        new HR().exportTax();
        new Engineering().exportTax();
        new Sales().exportTax();
        // New audit type (e.g. headcount) -> add a method to EVERY department.
    }
}`,
    `// FIX: departments accept a visitor; new audits are just new visitors.
interface Department { void accept(Visitor v); }

class HR          implements Department { public void accept(Visitor v) { v.visit(this); } }
class Engineering implements Department { public void accept(Visitor v) { v.visit(this); } }
class Sales       implements Department { public void accept(Visitor v) { v.visit(this); } }

interface Visitor {
    void visit(HR hr);
    void visit(Engineering eng);
    void visit(Sales sales);
}

class TaxVisitor implements Visitor {                   // one operation, all departments
    public void visit(HR hr)           { System.out.println("HR tax export"); }
    public void visit(Engineering eng) { System.out.println("Engineering tax export"); }
    public void visit(Sales sales)     { System.out.println("Sales tax export"); }
}

public class TaxDemo {
    public static void main(String[] args) {
        Department[] departments = { new HR(), new Engineering(), new Sales() };
        Visitor taxAudit = new TaxVisitor();
        for (Department d : departments) d.accept(taxAudit); // add visitors, not methods
    }
}`
  ),
};
