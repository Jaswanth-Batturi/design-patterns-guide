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

export const patternCode: Record<string, PatternCode> = {
  // Home Wi-Fi / AppConfig theme settings
  singleton: {
    codeBefore: `// Home Wi-Fi: every room installs its own router with its own password.
// Here, every service does "new AppConfig()" -> multiple sources of truth.
class AppConfig {
    String theme = "light";
    String apiUrl = "https://staging.example.com";
}

class ThemeService {
    void apply() {
        AppConfig config = new AppConfig();          // router #1
        config.theme = "dark";
        System.out.println("ThemeService set theme: " + config.theme);
    }
}

class ApiService {
    void call() {
        AppConfig config = new AppConfig();          // router #2 (different password!)
        System.out.println("ApiService sees theme: " + config.theme);
    }
}

public class SingletonProblemDemo {
    public static void main(String[] args) {
        new ThemeService().apply();                  // sets dark on its own copy
        new ApiService().call();                     // still "light" — different object
        // Two objects in memory, settings disagree — like two routers in one home.
    }
}`,
    codeAfter: `// Home Wi-Fi: ONE router, one SSID. Every device joins the same network.
// getInstance() is the only door to the shared AppConfig.
class AppConfig {
    private static AppConfig instance;
    private String theme = "light";

    private AppConfig() {}                            // no "new" from outside

    static AppConfig getInstance() {                 // the single Wi-Fi network
        if (instance == null) instance = new AppConfig();
        return instance;
    }
    void setTheme(String theme) {
        this.theme = theme;
        System.out.println("Theme is now: " + theme);
    }
    String getTheme() { return theme; }
}

public class SingletonDemo {
    public static void main(String[] args) {
        AppConfig a = AppConfig.getInstance();
        AppConfig b = AppConfig.getInstance();
        a.setTheme("dark");
        System.out.println("b sees theme: " + b.getTheme());   // dark
        System.out.println("Same object? " + (a == b));         // true
    }
}`,
    runDemo: `// Home Wi-Fi: ONE router, one SSID. Every device joins the same network.
// getInstance() is the only door to the shared AppConfig.
class AppConfig {
    private static AppConfig instance;
    private String theme = "light";

    private AppConfig() {}                            // no "new" from outside

    static AppConfig getInstance() {                 // the single Wi-Fi network
        if (instance == null) instance = new AppConfig();
        return instance;
    }
    void setTheme(String theme) {
        this.theme = theme;
        System.out.println("Theme is now: " + theme);
    }
    String getTheme() { return theme; }
}

public class SingletonDemo {
    public static void main(String[] args) {
        AppConfig a = AppConfig.getInstance();
        AppConfig b = AppConfig.getInstance();
        a.setTheme("dark");
        System.out.println("b sees theme: " + b.getTheme());   // dark
        System.out.println("Same object? " + (a == b));         // true
    }
}`,
  },

  // Coffee shop order (latte / espresso)
  factory: {
    codeBefore: `// Coffee shop: customers walk into the kitchen and follow recipes themselves.
// The Customer class branches on drink type — the counter has no control.
class Customer {
    void order(String type) {
        if (type.equals("latte")) {
            System.out.println("Grinding beans...");
            System.out.println("Steaming milk...");
            System.out.println("Serving a Latte");
        } else if (type.equals("espresso")) {
            System.out.println("Grinding beans...");
            System.out.println("Pulling a shot...");
            System.out.println("Serving an Espresso");
        }
        // New drink? Edit this same if/else chain every time.
    }
}

public class FactoryProblemDemo {
    public static void main(String[] args) {
        Customer customer = new Customer();
        customer.order("latte");
        customer.order("espresso");
    }
}`,
    codeAfter: `// Coffee shop: you say "latte" at the counter; the barista builds the drink.
// A factory method picks the right Coffee subclass behind the counter.
interface Coffee {
    void prepare();
}

class Latte implements Coffee {
    public void prepare() { System.out.println("Steaming milk for a Latte"); }
}

class Espresso implements Coffee {
    public void prepare() { System.out.println("Pulling a shot of Espresso"); }
}

class CoffeeShop {                                   // the counter
    Coffee order(String type) {                      // factory method
        switch (type) {
            case "latte":    return new Latte();
            case "espresso": return new Espresso();
            default: throw new IllegalArgumentException("Unknown drink: " + type);
        }
    }
}

public class FactoryDemo {
    public static void main(String[] args) {
        CoffeeShop shop = new CoffeeShop();
        shop.order("latte").prepare();
        shop.order("espresso").prepare();
    }
}`,
    runDemo: `// Coffee shop: you say "latte" at the counter; the barista builds the drink.
// A factory method picks the right Coffee subclass behind the counter.
interface Coffee {
    void prepare();
}

class Latte implements Coffee {
    public void prepare() { System.out.println("Steaming milk for a Latte"); }
}

class Espresso implements Coffee {
    public void prepare() { System.out.println("Pulling a shot of Espresso"); }
}

class CoffeeShop {                                   // the counter
    Coffee order(String type) {                      // factory method
        switch (type) {
            case "latte":    return new Latte();
            case "espresso": return new Espresso();
            default: throw new IllegalArgumentException("Unknown drink: " + type);
        }
    }
}

public class FactoryDemo {
    public static void main(String[] args) {
        CoffeeShop shop = new CoffeeShop();
        shop.order("latte").prepare();
        shop.order("espresso").prepare();
    }
}`,
  },

  // Matched furniture set -> Mac vs Win UI kit
  'abstract-factory': {
    codeBefore: `// Furniture set: mixing a Mac button with a Windows checkbox in one room.
// Widgets are created independently, so families get mismatched.
class MacButton { void paint() { System.out.println("[Mac] Button"); } }
class WinCheckbox { void paint() { System.out.println("[Win] Checkbox"); } }

class Screen {
    void render() {
        MacButton button = new MacButton();          // Mac style
        WinCheckbox checkbox = new WinCheckbox();    // Windows style — clash!
        button.paint();
        checkbox.paint();
        // Switching the whole theme means hunting down every "new" call.
    }
}

public class AbstractFactoryProblemDemo {
    public static void main(String[] args) {
        new Screen().render();                       // mismatched family on screen
    }
}`,
    codeAfter: `// Furniture set: pick one kit; the factory delivers a matched button + checkbox.
interface Button { void paint(); }
interface Checkbox { void paint(); }

class MacButton implements Button { public void paint() { System.out.println("[Mac] Button"); } }
class MacCheckbox implements Checkbox { public void paint() { System.out.println("[Mac] Checkbox"); } }
class WinButton implements Button { public void paint() { System.out.println("[Win] Button"); } }
class WinCheckbox implements Checkbox { public void paint() { System.out.println("[Win] Checkbox"); } }

interface UIFactory {                                // the showroom kit
    Button createButton();
    Checkbox createCheckbox();
}
class MacUIFactory implements UIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}
class WinUIFactory implements UIFactory {
    public Button createButton() { return new WinButton(); }
    public Checkbox createCheckbox() { return new WinCheckbox(); }
}

class Screen {
    void render(UIFactory factory) {                 // one kit -> matched family
        factory.createButton().paint();
        factory.createCheckbox().paint();
    }
}

public class AbstractFactoryDemo {
    public static void main(String[] args) {
        Screen screen = new Screen();
        screen.render(new MacUIFactory());
        screen.render(new WinUIFactory());
    }
}`,
    runDemo: `// Furniture set: pick one kit; the factory delivers a matched button + checkbox.
interface Button { void paint(); }
interface Checkbox { void paint(); }

class MacButton implements Button { public void paint() { System.out.println("[Mac] Button"); } }
class MacCheckbox implements Checkbox { public void paint() { System.out.println("[Mac] Checkbox"); } }
class WinButton implements Button { public void paint() { System.out.println("[Win] Button"); } }
class WinCheckbox implements Checkbox { public void paint() { System.out.println("[Win] Checkbox"); } }

interface UIFactory {                                // the showroom kit
    Button createButton();
    Checkbox createCheckbox();
}
class MacUIFactory implements UIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}
class WinUIFactory implements UIFactory {
    public Button createButton() { return new WinButton(); }
    public Checkbox createCheckbox() { return new WinCheckbox(); }
}

class Screen {
    void render(UIFactory factory) {                 // one kit -> matched family
        factory.createButton().paint();
        factory.createCheckbox().paint();
    }
}

public class AbstractFactoryDemo {
    public static void main(String[] args) {
        Screen screen = new Screen();
        screen.render(new MacUIFactory());
        screen.render(new WinUIFactory());
    }
}`,
  },

  // Burrito counter
  builder: {
    codeBefore: `// Burrito counter: everything dumped into one bag via a giant constructor.
class Burrito {
    // rice, beans, protein, cheese, salsa, guac... all positional, easy to mix up.
    Burrito(boolean rice, boolean beans, String protein,
            boolean cheese, boolean salsa, boolean guac) {
        System.out.println("Burrito: rice=" + rice + ", beans=" + beans +
            ", protein=" + protein + ", cheese=" + cheese +
            ", salsa=" + salsa + ", guac=" + guac);
    }
}

public class BuilderProblemDemo {
    public static void main(String[] args) {
        // Which boolean was cheese again? No validation, no readability.
        new Burrito(true, true, "carnitas", true, false, true);
    }
}`,
    codeAfter: `// Burrito counter: add layers fluently, then build() returns a finished burrito.
class Burrito {
    private final boolean rice, beans, cheese;
    private final String protein;

    private Burrito(Builder b) {
        this.rice = b.rice; this.beans = b.beans;
        this.protein = b.protein; this.cheese = b.cheese;
    }
    void describe() {
        System.out.println("Burrito with rice=" + rice + ", beans=" + beans +
            ", protein=" + protein + ", cheese=" + cheese);
    }

    static class Builder {
        boolean rice, beans, cheese;
        String protein = "none";
        Builder rice() { this.rice = true; return this; }
        Builder beans() { this.beans = true; return this; }
        Builder protein(String p) { this.protein = p; return this; }
        Builder cheese() { this.cheese = true; return this; }
        Burrito build() {                            // validate before serving
            if (protein.equals("none"))
                throw new IllegalStateException("Pick a protein!");
            return new Burrito(this);
        }
    }
}

public class BuilderDemo {
    public static void main(String[] args) {
        new Burrito.Builder().rice().beans().protein("carnitas").cheese().build().describe();
    }
}`,
    runDemo: `// Burrito counter: add layers fluently, then build() returns a finished burrito.
class Burrito {
    private final boolean rice, beans, cheese;
    private final String protein;

    private Burrito(Builder b) {
        this.rice = b.rice; this.beans = b.beans;
        this.protein = b.protein; this.cheese = b.cheese;
    }
    void describe() {
        System.out.println("Burrito with rice=" + rice + ", beans=" + beans +
            ", protein=" + protein + ", cheese=" + cheese);
    }

    static class Builder {
        boolean rice, beans, cheese;
        String protein = "none";
        Builder rice() { this.rice = true; return this; }
        Builder beans() { this.beans = true; return this; }
        Builder protein(String p) { this.protein = p; return this; }
        Builder cheese() { this.cheese = true; return this; }
        Burrito build() {                            // validate before serving
            if (protein.equals("none"))
                throw new IllegalStateException("Pick a protein!");
            return new Burrito(this);
        }
    }
}

public class BuilderDemo {
    public static void main(String[] args) {
        new Burrito.Builder().rice().beans().protein("carnitas").cheese().build().describe();
    }
}`,
  },

  // Duplicate Google Doc / document clone
  prototype: {
    codeBefore: `// Google Doc: rebuilding a document by copying every field by hand.
import java.util.*;

class Document {
    String title;
    String body;
    List<String> tags = new ArrayList<>();
}

public class PrototypeProblemDemo {
    static Document duplicate(Document original) {
        Document copy = new Document();
        copy.title = original.title;                 // forget one field...
        copy.body = original.body;
        // Oops: forgot to copy tags -> the "duplicate" loses nested state.
        return copy;
    }
    public static void main(String[] args) {
        Document template = new Document();
        template.title = "Client Template";
        template.tags.add("meeting");

        Document copy = duplicate(template);
        System.out.println("Copy title: " + copy.title);
        System.out.println("Copy tags: " + copy.tags + " (lost!)");
    }
}`,
    codeAfter: `// Google Doc: hit Duplicate; copy() copies the whole object graph in one call.
import java.util.*;

class Document {
    String title;
    String body;
    List<String> tags = new ArrayList<>();

    Document copy() {                                // one faithful copy
        Document c = new Document();
        c.title = this.title;
        c.body = this.body;
        c.tags = new ArrayList<>(this.tags);         // deep-copy nested list
        return c;
    }
}

public class PrototypeDemo {
    public static void main(String[] args) {
        Document template = new Document();
        template.title = "Client Template";
        template.tags.add("meeting");

        Document copy = template.copy();             // Duplicate
        copy.title = "Acme Standup";                 // edit only the copy
        System.out.println("Template: " + template.title + " " + template.tags);
        System.out.println("Copy: " + copy.title + " " + copy.tags);
    }
}`,
    runDemo: `// Google Doc: hit Duplicate; copy() copies the whole object graph in one call.
import java.util.*;

class Document {
    String title;
    String body;
    List<String> tags = new ArrayList<>();

    Document copy() {                                // one faithful copy
        Document c = new Document();
        c.title = this.title;
        c.body = this.body;
        c.tags = new ArrayList<>(this.tags);         // deep-copy nested list
        return c;
    }
}

public class PrototypeDemo {
    public static void main(String[] args) {
        Document template = new Document();
        template.title = "Client Template";
        template.tags.add("meeting");

        Document copy = template.copy();             // Duplicate
        copy.title = "Acme Standup";                 // edit only the copy
        System.out.println("Template: " + template.title + " " + template.tags);
        System.out.println("Copy: " + copy.title + " " + copy.tags);
    }
}`,
  },

  // USB-C to HDMI dongle / legacy payNow -> charge
  adapter: {
    codeBefore: `// USB-C -> HDMI: checkout jams the modern call straight into the legacy plug.
class LegacyPaymentService {                         // HDMI-only projector
    void payNow(String currency, long cents) {
        System.out.println("Legacy paid " + currency + " " + (cents / 100.0));
    }
}

class Checkout {
    void pay(double amount) {
        LegacyPaymentService legacy = new LegacyPaymentService();
        // Odd conversion + param order copy-pasted into every caller.
        legacy.payNow("USD", (long) (amount * 100));
    }
}

public class AdapterProblemDemo {
    public static void main(String[] args) {
        new Checkout().pay(49.99);
    }
}`,
    codeAfter: `// USB-C -> HDMI dongle: an adapter translates charge() into legacy payNow().
interface PaymentGateway {                            // the modern USB-C shape
    void charge(double amount);
}

class LegacyPaymentService {                          // untouched HDMI projector
    void payNow(String currency, long cents) {
        System.out.println("Legacy paid " + currency + " " + (cents / 100.0));
    }
}

class StripeAdapter implements PaymentGateway {       // the dongle
    private final LegacyPaymentService legacy = new LegacyPaymentService();
    public void charge(double amount) {
        legacy.payNow("USD", (long) (amount * 100)); // translation in ONE place
    }
}

class Checkout {
    private final PaymentGateway gateway;
    Checkout(PaymentGateway gateway) { this.gateway = gateway; }
    void pay(double amount) { gateway.charge(amount); } // only sees charge()
}

public class AdapterDemo {
    public static void main(String[] args) {
        Checkout checkout = new Checkout(new StripeAdapter());
        checkout.pay(49.99);
    }
}`,
    runDemo: `// USB-C -> HDMI dongle: an adapter translates charge() into legacy payNow().
interface PaymentGateway {                            // the modern USB-C shape
    void charge(double amount);
}

class LegacyPaymentService {                          // untouched HDMI projector
    void payNow(String currency, long cents) {
        System.out.println("Legacy paid " + currency + " " + (cents / 100.0));
    }
}

class StripeAdapter implements PaymentGateway {       // the dongle
    private final LegacyPaymentService legacy = new LegacyPaymentService();
    public void charge(double amount) {
        legacy.payNow("USD", (long) (amount * 100)); // translation in ONE place
    }
}

class Checkout {
    private final PaymentGateway gateway;
    Checkout(PaymentGateway gateway) { this.gateway = gateway; }
    void pay(double amount) { gateway.charge(amount); } // only sees charge()
}

public class AdapterDemo {
    public static void main(String[] args) {
        Checkout checkout = new Checkout(new StripeAdapter());
        checkout.pay(49.99);
    }
}`,
  },

  // TV remote + brands
  bridge: {
    codeBefore: `// TV remote welded to a brand: one remote class per TV brand -> class explosion.
class SonyRemote {
    void power() { System.out.println("Sony TV: power toggled"); }
}
class SamsungRemote {
    void power() { System.out.println("Samsung TV: power toggled"); }
}

public class BridgeProblemDemo {
    public static void main(String[] args) {
        new SonyRemote().power();
        new SamsungRemote().power();
        // Add a "mute" button? Edit BOTH remotes. Add LG? Another whole class.
    }
}`,
    codeAfter: `// Bridge: the remote (abstraction) holds a Device (implementation) reference.
interface Device {                                    // TV brand internals
    void on();
}
class SonyTV implements Device { public void on() { System.out.println("Sony TV: on"); } }
class SamsungTV implements Device { public void on() { System.out.println("Samsung TV: on"); } }

class Remote {                                        // same buttons for any TV
    protected final Device device;
    Remote(Device device) { this.device = device; }
    void power() { device.on(); }                     // delegate to the brand
}

public class BridgeDemo {
    public static void main(String[] args) {
        new Remote(new SonyTV()).power();
        new Remote(new SamsungTV()).power();          // swap the device, same remote
    }
}`,
    runDemo: `// Bridge: the remote (abstraction) holds a Device (implementation) reference.
interface Device {                                    // TV brand internals
    void on();
}
class SonyTV implements Device { public void on() { System.out.println("Sony TV: on"); } }
class SamsungTV implements Device { public void on() { System.out.println("Samsung TV: on"); } }

class Remote {                                        // same buttons for any TV
    protected final Device device;
    Remote(Device device) { this.device = device; }
    void power() { device.on(); }                     // delegate to the brand
}

public class BridgeDemo {
    public static void main(String[] args) {
        new Remote(new SonyTV()).power();
        new Remote(new SamsungTV()).power();          // swap the device, same remote
    }
}`,
  },

  // Folder tree / file system
  composite: {
    codeBefore: `// File system: files and folders have different APIs, so callers branch on type.
import java.util.*;

class FileItem { String name; FileItem(String n) { name = n; } }
class FolderItem {
    String name;
    List<Object> children = new ArrayList<>();
    FolderItem(String n) { name = n; }
}

public class CompositeProblemDemo {
    static void show(Object node, String indent) {
        if (node instanceof FileItem) {              // branch #1
            System.out.println(indent + ((FileItem) node).name);
        } else if (node instanceof FolderItem) {     // branch #2
            FolderItem f = (FolderItem) node;
            System.out.println(indent + f.name + "/");
            for (Object child : f.children) show(child, indent + "  ");
        }
        // Delete, rename, size... each repeats this isFolder() branching.
    }
    public static void main(String[] args) {
        FolderItem root = new FolderItem("Projects");
        root.children.add(new FileItem("readme.pdf"));
        FolderItem assets = new FolderItem("assets");
        assets.children.add(new FileItem("logo.png"));
        root.children.add(assets);
        show(root, "");
    }
}`,
    codeAfter: `// File system: File and Folder share one interface; show() works on both.
import java.util.*;

interface Node {
    void show(String indent);
}

class FileNode implements Node {
    private final String name;
    FileNode(String name) { this.name = name; }
    public void show(String indent) { System.out.println(indent + name); }
}

class FolderNode implements Node {                    // container is also a Node
    private final String name;
    private final List<Node> children = new ArrayList<>();
    FolderNode(String name) { this.name = name; }
    FolderNode add(Node child) { children.add(child); return this; }
    public void show(String indent) {
        System.out.println(indent + name + "/");
        for (Node child : children) child.show(indent + "  "); // recurse
    }
}

public class CompositeDemo {
    public static void main(String[] args) {
        FolderNode root = new FolderNode("Projects")
            .add(new FileNode("readme.pdf"))
            .add(new FolderNode("assets").add(new FileNode("logo.png")));
        root.show("");                               // one call walks the tree
    }
}`,
    runDemo: `// File system: File and Folder share one interface; show() works on both.
import java.util.*;

interface Node {
    void show(String indent);
}

class FileNode implements Node {
    private final String name;
    FileNode(String name) { this.name = name; }
    public void show(String indent) { System.out.println(indent + name); }
}

class FolderNode implements Node {                    // container is also a Node
    private final String name;
    private final List<Node> children = new ArrayList<>();
    FolderNode(String name) { this.name = name; }
    FolderNode add(Node child) { children.add(child); return this; }
    public void show(String indent) {
        System.out.println(indent + name + "/");
        for (Node child : children) child.show(indent + "  "); // recurse
    }
}

public class CompositeDemo {
    public static void main(String[] args) {
        FolderNode root = new FolderNode("Projects")
            .add(new FileNode("readme.pdf"))
            .add(new FolderNode("assets").add(new FileNode("logo.png")));
        root.show("");                               // one call walks the tree
    }
}`,
  },

  // Pizza toppings stack
  decorator: {
    codeBefore: `// Pizza toppings: a separate subclass for every combination -> explosion.
class Pizza { String desc() { return "Pizza"; } double cost() { return 8.0; } }
class PizzaWithCheese extends Pizza {
    String desc() { return "Pizza + Cheese"; } double cost() { return 9.0; }
}
class PizzaWithCheeseAndOlives extends Pizza {
    String desc() { return "Pizza + Cheese + Olives"; } double cost() { return 10.5; }
}

public class DecoratorProblemDemo {
    public static void main(String[] args) {
        Pizza p = new PizzaWithCheeseAndOlives();
        System.out.println(p.desc() + " = $" + p.cost());
        // Want mushrooms too? PizzaWithCheeseAndOlivesAndMushrooms... and on and on.
    }
}`,
    codeAfter: `// Pizza toppings: wrap the base pizza with topping decorators at runtime.
interface Pizza {
    String desc();
    double cost();
}
class PlainPizza implements Pizza {
    public String desc() { return "Pizza"; }
    public double cost() { return 8.0; }
}

abstract class ToppingDecorator implements Pizza {    // shared wrapper
    protected final Pizza inner;
    ToppingDecorator(Pizza inner) { this.inner = inner; }
}
class Cheese extends ToppingDecorator {
    Cheese(Pizza inner) { super(inner); }
    public String desc() { return inner.desc() + " + Cheese"; }
    public double cost() { return inner.cost() + 1.0; }
}
class Olives extends ToppingDecorator {
    Olives(Pizza inner) { super(inner); }
    public String desc() { return inner.desc() + " + Olives"; }
    public double cost() { return inner.cost() + 1.5; }
}

public class DecoratorDemo {
    public static void main(String[] args) {
        Pizza pizza = new Olives(new Cheese(new PlainPizza())); // stack toppings
        System.out.println(pizza.desc() + " = $" + pizza.cost());
    }
}`,
    runDemo: `// Pizza toppings: wrap the base pizza with topping decorators at runtime.
interface Pizza {
    String desc();
    double cost();
}
class PlainPizza implements Pizza {
    public String desc() { return "Pizza"; }
    public double cost() { return 8.0; }
}

abstract class ToppingDecorator implements Pizza {    // shared wrapper
    protected final Pizza inner;
    ToppingDecorator(Pizza inner) { this.inner = inner; }
}
class Cheese extends ToppingDecorator {
    Cheese(Pizza inner) { super(inner); }
    public String desc() { return inner.desc() + " + Cheese"; }
    public double cost() { return inner.cost() + 1.0; }
}
class Olives extends ToppingDecorator {
    Olives(Pizza inner) { super(inner); }
    public String desc() { return inner.desc() + " + Olives"; }
    public double cost() { return inner.cost() + 1.5; }
}

public class DecoratorDemo {
    public static void main(String[] args) {
        Pizza pizza = new Olives(new Cheese(new PlainPizza())); // stack toppings
        System.out.println(pizza.desc() + " = $" + pizza.cost());
    }
}`,
  },

  // Home theater one button (facade)
  facade: {
    codeBefore: `// Home theater: the UI must call every subsystem itself to watch a movie.
class Screen { void down() { System.out.println("Screen down"); } }
class Projector { void on() { System.out.println("Projector on"); } }
class SoundSystem { void surround() { System.out.println("Surround sound on"); } }

public class FacadeProblemDemo {
    public static void main(String[] args) {
        // Every caller learns the exact order and each subsystem API.
        new Screen().down();
        new Projector().on();
        new SoundSystem().surround();
        System.out.println("Movie playing");
    }
}`,
    codeAfter: `// Home theater: one "Watch movie" button. The facade coordinates subsystems.
class Screen { void down() { System.out.println("Screen down"); } }
class Projector { void on() { System.out.println("Projector on"); } }
class SoundSystem { void surround() { System.out.println("Surround sound on"); } }

class HomeTheaterFacade {                             // the one button
    private final Screen screen = new Screen();
    private final Projector projector = new Projector();
    private final SoundSystem sound = new SoundSystem();

    void watchMovie() {                               // hides the sequence
        screen.down();
        projector.on();
        sound.surround();
        System.out.println("Movie playing");
    }
}

public class FacadeDemo {
    public static void main(String[] args) {
        new HomeTheaterFacade().watchMovie();         // one friendly call
    }
}`,
    runDemo: `// Home theater: one "Watch movie" button. The facade coordinates subsystems.
class Screen { void down() { System.out.println("Screen down"); } }
class Projector { void on() { System.out.println("Projector on"); } }
class SoundSystem { void surround() { System.out.println("Surround sound on"); } }

class HomeTheaterFacade {                             // the one button
    private final Screen screen = new Screen();
    private final Projector projector = new Projector();
    private final SoundSystem sound = new SoundSystem();

    void watchMovie() {                               // hides the sequence
        screen.down();
        projector.on();
        sound.surround();
        System.out.println("Movie playing");
    }
}

public class FacadeDemo {
    public static void main(String[] args) {
        new HomeTheaterFacade().watchMovie();         // one friendly call
    }
}`,
  },

  // Forest of trees sharing sprites
  flyweight: {
    codeBefore: `// Forest: every tree stores its own full sprite -> memory balloons.
import java.util.*;

class Tree {
    int x, y;
    String texture;                                  // heavy sprite bytes
    Tree(int x, int y, String kind) {
        this.x = x; this.y = y;
        this.texture = "SPRITE_DATA_FOR_" + kind;    // duplicated per tree!
    }
}

public class FlyweightProblemDemo {
    public static void main(String[] args) {
        List<Tree> trees = new ArrayList<>();
        for (int i = 0; i < 10000; i++)              // 10,000 duplicate sprites
            trees.add(new Tree(i, i, "Oak"));
        System.out.println("Planted " + trees.size() + " trees, each with own sprite");
    }
}`,
    codeAfter: `// Forest: trees share one sprite per kind (intrinsic); only x/y differ (extrinsic).
import java.util.*;

class TreeType {                                      // shared flyweight
    final String kind;
    final String texture;
    TreeType(String kind) { this.kind = kind; this.texture = "SPRITE_" + kind; }
    void draw(int x, int y) { System.out.println("Draw " + kind + " at " + x + "," + y); }
}

class TreeFactory {                                   // cache of shared sprites
    private static final Map<String, TreeType> pool = new HashMap<>();
    static TreeType get(String kind) {
        return pool.computeIfAbsent(kind, TreeType::new);
    }
}

public class FlyweightDemo {
    public static void main(String[] args) {
        TreeType a = TreeFactory.get("Oak");
        TreeType b = TreeFactory.get("Oak");
        a.draw(1, 1);
        b.draw(5, 9);
        System.out.println("Shared sprite? " + (a == b));   // true
    }
}`,
    runDemo: `// Forest: trees share one sprite per kind (intrinsic); only x/y differ (extrinsic).
import java.util.*;

class TreeType {                                      // shared flyweight
    final String kind;
    final String texture;
    TreeType(String kind) { this.kind = kind; this.texture = "SPRITE_" + kind; }
    void draw(int x, int y) { System.out.println("Draw " + kind + " at " + x + "," + y); }
}

class TreeFactory {                                   // cache of shared sprites
    private static final Map<String, TreeType> pool = new HashMap<>();
    static TreeType get(String kind) {
        return pool.computeIfAbsent(kind, TreeType::new);
    }
}

public class FlyweightDemo {
    public static void main(String[] args) {
        TreeType a = TreeFactory.get("Oak");
        TreeType b = TreeFactory.get("Oak");
        a.draw(1, 1);
        b.draw(5, 9);
        System.out.println("Shared sprite? " + (a == b));   // true
    }
}`,
  },

  // Photo gallery lazy load
  proxy: {
    codeBefore: `// Photo gallery: the real image loads from disk in its constructor -> eager.
class RealImage {
    private final String file;
    RealImage(String file) {
        this.file = file;
        System.out.println("Loading HD image from disk: " + file); // slow, upfront
    }
    void display() { System.out.println("Showing " + file); }
}

public class ProxyProblemDemo {
    public static void main(String[] args) {
        // Every thumbnail loads full HD even if the user never views it.
        RealImage a = new RealImage("beach.jpg");
        RealImage b = new RealImage("hills.jpg");    // loaded even though unused
        a.display();
    }
}`,
    codeAfter: `// Photo gallery: a proxy shows a placeholder and lazy-loads HD on first view.
interface Image {
    void display();
}
class RealImage implements Image {
    private final String file;
    RealImage(String file) {
        this.file = file;
        System.out.println("Loading HD image from disk: " + file);
    }
    public void display() { System.out.println("Showing " + file); }
}

class ImageProxy implements Image {                   // stand-in, same interface
    private final String file;
    private RealImage real;                           // loaded on demand
    ImageProxy(String file) { this.file = file; }
    public void display() {
        if (real == null) real = new RealImage(file); // lazy load on first view
        real.display();
    }
}

public class ProxyDemo {
    public static void main(String[] args) {
        Image a = new ImageProxy("beach.jpg");
        Image b = new ImageProxy("hills.jpg");        // NOT loaded yet
        System.out.println("Proxies created, nothing loaded yet");
        a.display();                                  // loads only when viewed
    }
}`,
    runDemo: `// Photo gallery: a proxy shows a placeholder and lazy-loads HD on first view.
interface Image {
    void display();
}
class RealImage implements Image {
    private final String file;
    RealImage(String file) {
        this.file = file;
        System.out.println("Loading HD image from disk: " + file);
    }
    public void display() { System.out.println("Showing " + file); }
}

class ImageProxy implements Image {                   // stand-in, same interface
    private final String file;
    private RealImage real;                           // loaded on demand
    ImageProxy(String file) { this.file = file; }
    public void display() {
        if (real == null) real = new RealImage(file); // lazy load on first view
        real.display();
    }
}

public class ProxyDemo {
    public static void main(String[] args) {
        Image a = new ImageProxy("beach.jpg");
        Image b = new ImageProxy("hills.jpg");        // NOT loaded yet
        System.out.println("Proxies created, nothing loaded yet");
        a.display();                                  // loads only when viewed
    }
}`,
  },

  // Support ticket escalation
  'chain-of-responsibility': {
    codeBefore: `// Support: one dispatcher method decides the tier with nested if/else.
class SupportDesk {
    void handle(int priority, String issue) {
        if (priority <= 1) {
            System.out.println("L1 fixed: " + issue);
        } else if (priority == 2) {
            System.out.println("Billing fixed: " + issue);
        } else {
            System.out.println("Engineering fixed: " + issue);
        }
        // New tier or reordering? Edit this same method every time.
    }
}

public class ChainProblemDemo {
    public static void main(String[] args) {
        SupportDesk desk = new SupportDesk();
        desk.handle(1, "password reset");
        desk.handle(2, "double charge");
        desk.handle(3, "server down");
    }
}`,
    codeAfter: `// Support: handlers link together; each fixes the ticket or forwards it.
abstract class Handler {
    protected Handler next;
    Handler setNext(Handler next) { this.next = next; return next; }
    abstract void handle(int priority, String issue);
    protected void forward(int priority, String issue) {
        if (next != null) next.handle(priority, issue);
        else System.out.println("Unresolved: " + issue);
    }
}
class L1Handler extends Handler {
    void handle(int priority, String issue) {
        if (priority <= 1) System.out.println("L1 fixed: " + issue);
        else forward(priority, issue);
    }
}
class BillingHandler extends Handler {
    void handle(int priority, String issue) {
        if (priority == 2) System.out.println("Billing fixed: " + issue);
        else forward(priority, issue);
    }
}
class EngineeringHandler extends Handler {
    void handle(int priority, String issue) {
        System.out.println("Engineering fixed: " + issue);
    }
}

public class ChainDemo {
    public static void main(String[] args) {
        Handler l1 = new L1Handler();
        l1.setNext(new BillingHandler()).setNext(new EngineeringHandler());
        l1.handle(1, "password reset");               // walks the chain
        l1.handle(2, "double charge");
        l1.handle(3, "server down");
    }
}`,
    runDemo: `// Support: handlers link together; each fixes the ticket or forwards it.
abstract class Handler {
    protected Handler next;
    Handler setNext(Handler next) { this.next = next; return next; }
    abstract void handle(int priority, String issue);
    protected void forward(int priority, String issue) {
        if (next != null) next.handle(priority, issue);
        else System.out.println("Unresolved: " + issue);
    }
}
class L1Handler extends Handler {
    void handle(int priority, String issue) {
        if (priority <= 1) System.out.println("L1 fixed: " + issue);
        else forward(priority, issue);
    }
}
class BillingHandler extends Handler {
    void handle(int priority, String issue) {
        if (priority == 2) System.out.println("Billing fixed: " + issue);
        else forward(priority, issue);
    }
}
class EngineeringHandler extends Handler {
    void handle(int priority, String issue) {
        System.out.println("Engineering fixed: " + issue);
    }
}

public class ChainDemo {
    public static void main(String[] args) {
        Handler l1 = new L1Handler();
        l1.setNext(new BillingHandler()).setNext(new EngineeringHandler());
        l1.handle(1, "password reset");               // walks the chain
        l1.handle(2, "double charge");
        l1.handle(3, "server down");
    }
}`,
  },

  // Text editor undo
  command: {
    codeBefore: `// Text editor: the Bold button calls the editor directly -> no undo, no history.
class Editor {
    boolean bold = false;
    void toggleBold() { bold = !bold; System.out.println("Bold: " + bold); }
}

public class CommandProblemDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        editor.toggleBold();                          // no ticket, no way to undo
        editor.toggleBold();
        // There's no stack of actions to pop and reverse.
    }
}`,
    codeAfter: `// Text editor: each action is a Command with execute()/undo(); a stack undoes.
import java.util.*;

class Editor {
    boolean bold = false;
    void setBold(boolean b) { bold = b; System.out.println("Bold: " + bold); }
}

interface Command {
    void execute();
    void undo();
}
class BoldCommand implements Command {
    private final Editor editor;
    private boolean previous;
    BoldCommand(Editor editor) { this.editor = editor; }
    public void execute() { previous = editor.bold; editor.setBold(!editor.bold); }
    public void undo() { editor.setBold(previous); }
}

public class CommandDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        Deque<Command> history = new ArrayDeque<>();
        Command bold = new BoldCommand(editor);
        bold.execute(); history.push(bold);
        System.out.println("Undoing...");
        history.pop().undo();
    }
}`,
    runDemo: `// Text editor: each action is a Command with execute()/undo(); a stack undoes.
import java.util.*;

class Editor {
    boolean bold = false;
    void setBold(boolean b) { bold = b; System.out.println("Bold: " + bold); }
}

interface Command {
    void execute();
    void undo();
}
class BoldCommand implements Command {
    private final Editor editor;
    private boolean previous;
    BoldCommand(Editor editor) { this.editor = editor; }
    public void execute() { previous = editor.bold; editor.setBold(!editor.bold); }
    public void undo() { editor.setBold(previous); }
}

public class CommandDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        Deque<Command> history = new ArrayDeque<>();
        Command bold = new BoldCommand(editor);
        bold.execute(); history.push(bold);
        System.out.println("Undoing...");
        history.pop().undo();
    }
}`,
  },

  // Access rule grammar
  interpreter: {
    codeBefore: `// Access rules: permission checks buried in fragile string parsing.
class AccessChecker {
    boolean check(String rule, String role) {
        // e.g. rule = "admin AND editor" parsed with brittle string ops.
        if (rule.contains("AND")) {
            String[] parts = rule.split(" AND ");
            return role.equals(parts[0]) || role.equals(parts[1]);
        } else if (rule.contains("admin")) {
            return role.equals("admin");
        }
        return false;
        // Adding OR or a new role means editing this parser again.
    }
}

public class InterpreterProblemDemo {
    public static void main(String[] args) {
        AccessChecker checker = new AccessChecker();
        System.out.println("admin allowed? " + checker.check("admin AND editor", "admin"));
        System.out.println("guest allowed? " + checker.check("admin AND editor", "guest"));
    }
}`,
    codeAfter: `// Access rules: each rule is an Expression node; interpret() evaluates the tree.
interface Expression {
    boolean interpret(String role);
}
class RoleExpression implements Expression {          // terminal (leaf)
    private final String role;
    RoleExpression(String role) { this.role = role; }
    public boolean interpret(String r) { return r.equals(role); }
}
class Or implements Expression {                      // non-terminal
    private final Expression left, right;
    Or(Expression left, Expression right) { this.left = left; this.right = right; }
    public boolean interpret(String r) { return left.interpret(r) || right.interpret(r); }
}

public class InterpreterDemo {
    public static void main(String[] args) {
        Expression rule = new Or(new RoleExpression("admin"),
                                 new RoleExpression("editor"));
        System.out.println("admin allowed? " + rule.interpret("admin"));
        System.out.println("guest allowed? " + rule.interpret("guest"));
    }
}`,
    runDemo: `// Access rules: each rule is an Expression node; interpret() evaluates the tree.
interface Expression {
    boolean interpret(String role);
}
class RoleExpression implements Expression {          // terminal (leaf)
    private final String role;
    RoleExpression(String role) { this.role = role; }
    public boolean interpret(String r) { return r.equals(role); }
}
class Or implements Expression {                      // non-terminal
    private final Expression left, right;
    Or(Expression left, Expression right) { this.left = left; this.right = right; }
    public boolean interpret(String r) { return left.interpret(r) || right.interpret(r); }
}

public class InterpreterDemo {
    public static void main(String[] args) {
        Expression rule = new Or(new RoleExpression("admin"),
                                 new RoleExpression("editor"));
        System.out.println("admin allowed? " + rule.interpret("admin"));
        System.out.println("guest allowed? " + rule.interpret("guest"));
    }
}`,
  },

  // Music playlist
  iterator: {
    codeBefore: `// Music playlist: the Next button is tied to array indices.
class Playlist {
    String[] songs = { "Intro", "Verse", "Chorus" };
}

public class IteratorProblemDemo {
    public static void main(String[] args) {
        Playlist playlist = new Playlist();
        // Tightly coupled to array indexing/length.
        for (int i = 0; i < playlist.songs.length; i++)
            System.out.println("Now playing: " + playlist.songs[i]);
        // Switch to a LinkedList backing store and every caller breaks.
    }
}`,
    codeAfter: `// Music playlist: an Iterator exposes hasNext()/next(); storage stays hidden.
import java.util.*;

interface SongIterator {
    boolean hasNext();
    String next();
}
class Playlist {
    private final List<String> songs = new ArrayList<>();
    Playlist add(String song) { songs.add(song); return this; }
    SongIterator iterator() {
        return new SongIterator() {                   // hides the backing list
            private int index = 0;
            public boolean hasNext() { return index < songs.size(); }
            public String next() { return songs.get(index++); }
        };
    }
}

public class IteratorDemo {
    public static void main(String[] args) {
        Playlist playlist = new Playlist().add("Intro").add("Verse").add("Chorus");
        SongIterator it = playlist.iterator();
        while (it.hasNext()) System.out.println("Now playing: " + it.next());
    }
}`,
    runDemo: `// Music playlist: an Iterator exposes hasNext()/next(); storage stays hidden.
import java.util.*;

interface SongIterator {
    boolean hasNext();
    String next();
}
class Playlist {
    private final List<String> songs = new ArrayList<>();
    Playlist add(String song) { songs.add(song); return this; }
    SongIterator iterator() {
        return new SongIterator() {                   // hides the backing list
            private int index = 0;
            public boolean hasNext() { return index < songs.size(); }
            public String next() { return songs.get(index++); }
        };
    }
}

public class IteratorDemo {
    public static void main(String[] args) {
        Playlist playlist = new Playlist().add("Intro").add("Verse").add("Chorus");
        SongIterator it = playlist.iterator();
        while (it.hasNext()) System.out.println("Now playing: " + it.next());
    }
}`,
  },

  // Group chat room
  mediator: {
    codeBefore: `// Group chat: users hold direct references to each other -> tangled mesh.
import java.util.*;

class User {
    String name;
    List<User> peers = new ArrayList<>();
    User(String name) { this.name = name; }
    void send(String msg) {
        for (User peer : peers)                       // must know every other user
            System.out.println(name + " -> " + peer.name + ": " + msg);
    }
}

public class MediatorProblemDemo {
    public static void main(String[] args) {
        User alice = new User("Alice");
        User bob = new User("Bob");
        User carol = new User("Carol");
        // Adding a user means wiring it into every existing user's peer list.
        alice.peers.add(bob);
        alice.peers.add(carol);
        alice.send("Meeting at 5");
    }
}`,
    codeAfter: `// Group chat: users talk to a ChatRoom mediator; it routes messages.
import java.util.*;

class ChatRoom {                                      // the mediator
    private final List<User> users = new ArrayList<>();
    void register(User user) { users.add(user); user.room = this; }
    void send(String from, String msg) {
        for (User user : users)
            if (!user.name.equals(from))
                System.out.println(from + " -> " + user.name + ": " + msg);
    }
}
class User {
    String name;
    ChatRoom room;
    User(String name) { this.name = name; }
    void send(String msg) { room.send(name, msg); }   // only knows the room
}

public class MediatorDemo {
    public static void main(String[] args) {
        ChatRoom room = new ChatRoom();
        User alice = new User("Alice");
        User bob = new User("Bob");
        User carol = new User("Carol");
        room.register(alice);
        room.register(bob);
        room.register(carol);
        alice.send("Meeting at 5");
    }
}`,
    runDemo: `// Group chat: users talk to a ChatRoom mediator; it routes messages.
import java.util.*;

class ChatRoom {                                      // the mediator
    private final List<User> users = new ArrayList<>();
    void register(User user) { users.add(user); user.room = this; }
    void send(String from, String msg) {
        for (User user : users)
            if (!user.name.equals(from))
                System.out.println(from + " -> " + user.name + ": " + msg);
    }
}
class User {
    String name;
    ChatRoom room;
    User(String name) { this.name = name; }
    void send(String msg) { room.send(name, msg); }   // only knows the room
}

public class MediatorDemo {
    public static void main(String[] args) {
        ChatRoom room = new ChatRoom();
        User alice = new User("Alice");
        User bob = new User("Bob");
        User carol = new User("Carol");
        room.register(alice);
        room.register(bob);
        room.register(carol);
        alice.send("Meeting at 5");
    }
}`,
  },

  // Document undo snapshots
  memento: {
    codeBefore: `// Document undo: the caretaker copies a public field -> broken encapsulation.
class Editor {
    String text = "";                                 // exposed for backup
}

public class MementoProblemDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        editor.text = "hello";
        String backup = editor.text;                  // manual copy
        editor.text = "hello world";
        editor.text = backup;                         // manual restore
        System.out.println(editor.text);
        // Anyone can mutate live state; undo logic leaks everywhere.
    }
}`,
    codeAfter: `// Document undo: originator makes opaque Mementos; a caretaker stores history.
import java.util.*;

class Editor {
    private String text = "";
    void type(String t) { text = t; }
    String getText() { return text; }
    Memento save() { return new Memento(text); }      // opaque snapshot
    void restore(Memento m) { text = m.state; }

    static class Memento {                             // caretaker can't peek
        private final String state;
        private Memento(String state) { this.state = state; }
    }
}

public class MementoDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        Deque<Editor.Memento> history = new ArrayDeque<>();
        editor.type("hello");
        history.push(editor.save());                  // checkpoint
        editor.type("hello world");
        System.out.println("Before undo: " + editor.getText());
        editor.restore(history.pop());                // undo
        System.out.println("After undo: " + editor.getText());
    }
}`,
    runDemo: `// Document undo: originator makes opaque Mementos; a caretaker stores history.
import java.util.*;

class Editor {
    private String text = "";
    void type(String t) { text = t; }
    String getText() { return text; }
    Memento save() { return new Memento(text); }      // opaque snapshot
    void restore(Memento m) { text = m.state; }

    static class Memento {                             // caretaker can't peek
        private final String state;
        private Memento(String state) { this.state = state; }
    }
}

public class MementoDemo {
    public static void main(String[] args) {
        Editor editor = new Editor();
        Deque<Editor.Memento> history = new ArrayDeque<>();
        editor.type("hello");
        history.push(editor.save());                  // checkpoint
        editor.type("hello world");
        System.out.println("Before undo: " + editor.getText());
        editor.restore(history.pop());                // undo
        System.out.println("After undo: " + editor.getText());
    }
}`,
  },

  // Stock price alerts
  observer: {
    codeBefore: `// Stock alerts: the ticker hard-codes each notification channel inside setPrice().
class StockTicker {
    void setPrice(String symbol, double price) {
        System.out.println(symbol + " = " + price);
        // Every channel is baked into the ticker -> edit here to add SMS.
        System.out.println("Phone alert: " + symbol + " " + price);
        System.out.println("Email alert: " + symbol + " " + price);
    }
}

public class ObserverProblemDemo {
    public static void main(String[] args) {
        new StockTicker().setPrice("AAPL", 231.5);
    }
}`,
    codeAfter: `// Stock alerts: the ticker notifies subscribed observers; add channels freely.
import java.util.*;

interface Observer {
    void update(String symbol, double price);
}
class PhoneAlert implements Observer {
    public void update(String symbol, double price) {
        System.out.println("Phone alert: " + symbol + " " + price);
    }
}
class EmailAlert implements Observer {
    public void update(String symbol, double price) {
        System.out.println("Email alert: " + symbol + " " + price);
    }
}

class StockTicker {                                   // the subject
    private final List<Observer> observers = new ArrayList<>();
    void subscribe(Observer o) { observers.add(o); }
    void setPrice(String symbol, double price) {
        for (Observer o : observers) o.update(symbol, price); // push to all
    }
}

public class ObserverDemo {
    public static void main(String[] args) {
        StockTicker ticker = new StockTicker();
        ticker.subscribe(new PhoneAlert());
        ticker.subscribe(new EmailAlert());
        ticker.setPrice("AAPL", 231.5);
    }
}`,
    runDemo: `// Stock alerts: the ticker notifies subscribed observers; add channels freely.
import java.util.*;

interface Observer {
    void update(String symbol, double price);
}
class PhoneAlert implements Observer {
    public void update(String symbol, double price) {
        System.out.println("Phone alert: " + symbol + " " + price);
    }
}
class EmailAlert implements Observer {
    public void update(String symbol, double price) {
        System.out.println("Email alert: " + symbol + " " + price);
    }
}

class StockTicker {                                   // the subject
    private final List<Observer> observers = new ArrayList<>();
    void subscribe(Observer o) { observers.add(o); }
    void setPrice(String symbol, double price) {
        for (Observer o : observers) o.update(symbol, price); // push to all
    }
}

public class ObserverDemo {
    public static void main(String[] args) {
        StockTicker ticker = new StockTicker();
        ticker.subscribe(new PhoneAlert());
        ticker.subscribe(new EmailAlert());
        ticker.setPrice("AAPL", 231.5);
    }
}`,
  },

  // Order lifecycle states
  state: {
    codeBefore: `// Order lifecycle: one class with status flags and if/else on every action.
class Order {
    String status = "NEW";
    void pay() {
        if (status.equals("NEW")) { status = "PAID"; System.out.println("Paid"); }
        else System.out.println("Cannot pay from " + status);
    }
    void ship() {
        if (status.equals("PAID")) { status = "SHIPPED"; System.out.println("Shipped"); }
        else System.out.println("Cannot ship from " + status); // invalid jumps slip in
    }
    // Add "Refunded" and every method grows another branch.
}

public class StateProblemDemo {
    public static void main(String[] args) {
        Order order = new Order();
        order.ship();                                 // invalid: not paid yet
        order.pay();
        order.ship();
    }
}`,
    codeAfter: `// Order lifecycle: each state is an object owning only its valid transitions.
interface OrderState {
    void pay(Order order);
    void ship(Order order);
}
class NewState implements OrderState {
    public void pay(Order order) { System.out.println("Paid"); order.setState(new PaidState()); }
    public void ship(Order order) { System.out.println("Cannot ship: not paid"); }
}
class PaidState implements OrderState {
    public void pay(Order order) { System.out.println("Already paid"); }
    public void ship(Order order) { System.out.println("Shipped"); order.setState(new ShippedState()); }
}
class ShippedState implements OrderState {
    public void pay(Order order) { System.out.println("Already shipped"); }
    public void ship(Order order) { System.out.println("Already shipped"); }
}

class Order {
    private OrderState state = new NewState();
    void setState(OrderState state) { this.state = state; }
    void pay() { state.pay(this); }                   // delegate to current state
    void ship() { state.ship(this); }
}

public class StateDemo {
    public static void main(String[] args) {
        Order order = new Order();
        order.ship();                                 // Cannot ship: not paid
        order.pay();                                  // Paid
        order.ship();                                 // Shipped
    }
}`,
    runDemo: `// Order lifecycle: each state is an object owning only its valid transitions.
interface OrderState {
    void pay(Order order);
    void ship(Order order);
}
class NewState implements OrderState {
    public void pay(Order order) { System.out.println("Paid"); order.setState(new PaidState()); }
    public void ship(Order order) { System.out.println("Cannot ship: not paid"); }
}
class PaidState implements OrderState {
    public void pay(Order order) { System.out.println("Already paid"); }
    public void ship(Order order) { System.out.println("Shipped"); order.setState(new ShippedState()); }
}
class ShippedState implements OrderState {
    public void pay(Order order) { System.out.println("Already shipped"); }
    public void ship(Order order) { System.out.println("Already shipped"); }
}

class Order {
    private OrderState state = new NewState();
    void setState(OrderState state) { this.state = state; }
    void pay() { state.pay(this); }                   // delegate to current state
    void ship() { state.ship(this); }
}

public class StateDemo {
    public static void main(String[] args) {
        Order order = new Order();
        order.ship();                                 // Cannot ship: not paid
        order.pay();                                  // Paid
        order.ship();                                 // Shipped
    }
}`,
  },

  // Payment methods
  strategy: {
    codeBefore: `// Checkout: pay() is one method full of payment-type if/else.
class Checkout {
    void pay(String method, double amount) {
        if (method.equals("card")) {
            System.out.println("Card paid " + amount);
        } else if (method.equals("upi")) {
            System.out.println("UPI paid " + amount);
        } else if (method.equals("cash")) {
            System.out.println("Cash paid " + amount);
        }
        // Add PayPal -> edit pay() again and retest every branch.
    }
}

public class StrategyProblemDemo {
    public static void main(String[] args) {
        Checkout checkout = new Checkout();
        checkout.pay("card", 100.0);
        checkout.pay("upi", 250.0);
    }
}`,
    codeAfter: `// Checkout: pick a PaymentStrategy; pay() delegates to strategy.process().
interface PaymentStrategy {
    void process(double amount);
}
class CardPayment implements PaymentStrategy {
    public void process(double amount) { System.out.println("Card paid " + amount); }
}
class UpiPayment implements PaymentStrategy {
    public void process(double amount) { System.out.println("UPI paid " + amount); }
}

class Checkout {
    private PaymentStrategy strategy;
    void setStrategy(PaymentStrategy strategy) { this.strategy = strategy; }
    void pay(double amount) { strategy.process(amount); } // same Pay button
}

public class StrategyDemo {
    public static void main(String[] args) {
        Checkout checkout = new Checkout();
        checkout.setStrategy(new CardPayment());
        checkout.pay(100.0);
        checkout.setStrategy(new UpiPayment());       // add PayPal without touching Checkout
        checkout.pay(250.0);
    }
}`,
    runDemo: `// Checkout: pick a PaymentStrategy; pay() delegates to strategy.process().
interface PaymentStrategy {
    void process(double amount);
}
class CardPayment implements PaymentStrategy {
    public void process(double amount) { System.out.println("Card paid " + amount); }
}
class UpiPayment implements PaymentStrategy {
    public void process(double amount) { System.out.println("UPI paid " + amount); }
}

class Checkout {
    private PaymentStrategy strategy;
    void setStrategy(PaymentStrategy strategy) { this.strategy = strategy; }
    void pay(double amount) { strategy.process(amount); } // same Pay button
}

public class StrategyDemo {
    public static void main(String[] args) {
        Checkout checkout = new Checkout();
        checkout.setStrategy(new CardPayment());
        checkout.pay(100.0);
        checkout.setStrategy(new UpiPayment());       // add PayPal without touching Checkout
        checkout.pay(250.0);
    }
}`,
  },

  // Report generation workflow
  'template-method': {
    codeBefore: `// Report generation: each report duplicates fetch and print steps.
class SalesReport {
    void generate() {
        System.out.println("Fetching data...");      // duplicated
        System.out.println("Formatting sales rows"); // varies
        System.out.println("Printing report");       // duplicated
    }
}
class InventoryReport {
    void generate() {
        System.out.println("Fetching data...");      // copy-pasted again
        System.out.println("Formatting inventory rows");
        System.out.println("Printing report");       // fix order in one, forget the other
    }
}

public class TemplateMethodProblemDemo {
    public static void main(String[] args) {
        new SalesReport().generate();
        new InventoryReport().generate();
    }
}`,
    codeAfter: `// Report generation: a base defines the skeleton; subclasses override one step.
abstract class Report {
    final void generate() {                           // the template (skeleton)
        fetch();
        format();                                     // the varying step
        print();
    }
    private void fetch() { System.out.println("Fetching data..."); }
    abstract void format();
    private void print() { System.out.println("Printing report"); }
}
class SalesReport extends Report {
    void format() { System.out.println("Formatting sales rows"); }
}
class InventoryReport extends Report {
    void format() { System.out.println("Formatting inventory rows"); }
}

public class TemplateMethodDemo {
    public static void main(String[] args) {
        new SalesReport().generate();
        new InventoryReport().generate();
    }
}`,
    runDemo: `// Report generation: a base defines the skeleton; subclasses override one step.
abstract class Report {
    final void generate() {                           // the template (skeleton)
        fetch();
        format();                                     // the varying step
        print();
    }
    private void fetch() { System.out.println("Fetching data..."); }
    abstract void format();
    private void print() { System.out.println("Printing report"); }
}
class SalesReport extends Report {
    void format() { System.out.println("Formatting sales rows"); }
}
class InventoryReport extends Report {
    void format() { System.out.println("Formatting inventory rows"); }
}

public class TemplateMethodDemo {
    public static void main(String[] args) {
        new SalesReport().generate();
        new InventoryReport().generate();
    }
}`,
  },

  // Shape export operations
  visitor: {
    codeBefore: `// Shape export: every export type is a method piled onto each shape class.
class Circle {
    double r;
    Circle(double r) { this.r = r; }
    void exportPdf() { System.out.println("Circle to PDF"); }
    void exportJson() { System.out.println("Circle to JSON"); } // more piling on
}
class Square {
    double s;
    Square(double s) { this.s = s; }
    void exportPdf() { System.out.println("Square to PDF"); }
    void exportJson() { System.out.println("Square to JSON"); }
}

public class VisitorProblemDemo {
    public static void main(String[] args) {
        new Circle(2).exportPdf();
        new Square(3).exportJson();
        // Adding an "area" report means editing EVERY shape class.
    }
}`,
    codeAfter: `// Shape export: shapes accept a visitor; new operations are new visitors.
interface Visitor {
    void visit(Circle c);
    void visit(Square s);
}
interface Shape {
    void accept(Visitor v);                           // double-dispatch hook
}
class Circle implements Shape {
    double r;
    Circle(double r) { this.r = r; }
    public void accept(Visitor v) { v.visit(this); }
}
class Square implements Shape {
    double s;
    Square(double s) { this.s = s; }
    public void accept(Visitor v) { v.visit(this); }
}

class AreaVisitor implements Visitor {                // one new operation, one class
    public void visit(Circle c) { System.out.println("Circle area: " + (3.14 * c.r * c.r)); }
    public void visit(Square s) { System.out.println("Square area: " + (s.s * s.s)); }
}

public class VisitorDemo {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(2), new Square(3) };
        Visitor area = new AreaVisitor();
        for (Shape shape : shapes) shape.accept(area);
    }
}`,
    runDemo: `// Shape export: shapes accept a visitor; new operations are new visitors.
interface Visitor {
    void visit(Circle c);
    void visit(Square s);
}
interface Shape {
    void accept(Visitor v);                           // double-dispatch hook
}
class Circle implements Shape {
    double r;
    Circle(double r) { this.r = r; }
    public void accept(Visitor v) { v.visit(this); }
}
class Square implements Shape {
    double s;
    Square(double s) { this.s = s; }
    public void accept(Visitor v) { v.visit(this); }
}

class AreaVisitor implements Visitor {                // one new operation, one class
    public void visit(Circle c) { System.out.println("Circle area: " + (3.14 * c.r * c.r)); }
    public void visit(Square s) { System.out.println("Square area: " + (s.s * s.s)); }
}

public class VisitorDemo {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(2), new Square(3) };
        Visitor area = new AreaVisitor();
        for (Shape shape : shapes) shape.accept(area);
    }
}`,
  },
};
