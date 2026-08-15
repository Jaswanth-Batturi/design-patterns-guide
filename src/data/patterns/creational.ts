import type { Pattern } from './types';

export const creationalPatterns: Pattern[] = [
  {
    slug: 'singleton',
    name: 'Singleton',
    category: 'creational',
    oneLiner: 'One shared instance for the whole app — like one electric meter for every room.',
    analogy:
      'One manager per store, one president per country, one remote paired to one TV — there should only be one authoritative instance.',
    analogyIcon: '🔑',
    problem:
      'Some resources must be shared globally (config, connection pool, logger). Multiple instances cause inconsistent state, wasted memory, or conflicting access to scarce resources.',
    solution:
      'Hide the constructor, expose a static method that returns the single instance (often lazy-initialized). All code uses that same instance.',
    whenToUse: [
      'Exactly one shared instance must coordinate system-wide access',
      'The instance is expensive to create and reused everywhere',
      'A single source of truth prevents conflicting configuration or state',
      'Examples: app config, thread pool, hardware driver access',
    ],
    whenNotToUse: [
      'You use it as a global dumping ground for unrelated state',
      'You need multiple instances in tests or multi-tenant apps',
      'Dependency injection can provide a shared instance instead',
    ],
    relatedPatterns: ['factory', 'prototype'],
    codeBefore: `// Singleton problem — multiple config objects, inconsistent settings
public class App {
    public void run() {
        AppConfig config1 = new AppConfig();
        AppConfig config2 = new AppConfig();
        // Two instances — settings may diverge
    }
}`,
    codeAfter: `// Singleton — one shared config instance
public class AppConfig {
    private static AppConfig instance;

    private AppConfig() {
        // private constructor prevents outside instantiation
    }

    public static synchronized AppConfig getInstance() {
        if (instance == null) {
            instance = new AppConfig();
        }
        return instance;
    }
}

public class App {
    public void run() {
        AppConfig config = AppConfig.getInstance();
        // Everyone reads the same configuration
    }
}`,
    quiz: [
      {
        question: 'Singleton guarantees…',
        options: [
          'Fastest algorithm for sorting',
          'Only one instance of a class exists',
          'All observers get notified',
          'Objects can be wrapped with extra behavior',
        ],
        correctIndex: 1,
        explanation:
          'Singleton restricts instantiation so one shared object is used application-wide.',
      },
      {
        question: 'A common misuse of Singleton is…',
        options: [
          'Sharing a read-only config object',
          'Using it as a global junk drawer for unrelated data',
          'Coordinating a single hardware connection',
          'Lazy initialization of an expensive resource',
        ],
        correctIndex: 1,
        explanation:
          'Singleton is often overused; global mutable state makes testing and reasoning harder.',
      },
    ],
  },
  {
    slug: 'factory',
    name: 'Factory Method',
    category: 'creational',
    oneLiner: 'Let subclasses or dedicated creators decide which concrete product to instantiate.',
    analogy:
      'A restaurant menu: you order "burger" — the kitchen decides which recipe and ingredients to use. You don\'t walk into the kitchen to assemble it yourself.',
    analogyIcon: '🍽️',
    problem:
      'Client code uses `new ConcreteClass()` everywhere. When you add new types or change construction logic, you must hunt through the codebase. Subclasses cannot easily swap the products they create.',
    solution:
      'Define a creator with a factory method that returns a product interface. Subclasses override the factory method to produce different concrete types. Clients depend on the interface, not the concrete class.',
    whenToUse: [
      'You don\'t know ahead of time which concrete class you need',
      'Subclasses should control which product variant gets created',
      'Creation logic is complex but belongs with a specific family of types',
      'Examples: document parsers, UI widgets, transport connectors',
    ],
    whenNotToUse: [
      'Construction is trivial — `new MyClass()` is fine',
      'You only ever create one concrete type with no variation',
      'You need coordinated families of related products — use Abstract Factory',
    ],
    relatedPatterns: ['abstract-factory', 'prototype', 'singleton'],
    codeBefore: `// Factory Method smell — client picks concrete classes
public class ReportApp {
    public void export(String type, String data) {
        if ("pdf".equals(type)) {
            PdfExporter exporter = new PdfExporter();
            exporter.export(data);
        } else if ("excel".equals(type)) {
            ExcelExporter exporter = new ExcelExporter();
            exporter.export(data);
        }
    }
}`,
    codeAfter: `// Factory Method — creators decide the concrete product
public interface Exporter {
    void export(String data);
}

public abstract class ExporterCreator {
    public void generateReport(String data) {
        Exporter exporter = createExporter();
        exporter.export(data);
    }

    protected abstract Exporter createExporter();
}

public class PdfExporterCreator extends ExporterCreator {
    protected Exporter createExporter() {
        return new PdfExporter();
    }
}

public class ExcelExporterCreator extends ExporterCreator {
    protected Exporter createExporter() {
        return new ExcelExporter();
    }
}`,
    quiz: [
      {
        question: 'Factory Method mainly helps with…',
        options: [
          'Notifying listeners of state changes',
          'Decoupling object creation from usage',
          'Adding features to objects dynamically',
          'Limiting instances to one per class',
        ],
        correctIndex: 1,
        explanation:
          'Factory Method moves instantiation into overridable creator methods so clients stay decoupled from concrete classes.',
      },
      {
        question: 'Restaurant menu → kitchen is an analogy for…',
        options: ['Observer', 'Factory Method', 'Decorator', 'Command'],
        correctIndex: 1,
        explanation:
          'You request a product; the creator (kitchen) handles how the concrete product is built.',
      },
    ],
  },
  {
    slug: 'abstract-factory',
    name: 'Abstract Factory',
    category: 'creational',
    oneLiner: 'Create families of related objects without naming their concrete classes.',
    analogy:
      'Furniture showroom kits: pick a "Modern" or "Victorian" style and get a matching chair, sofa, and table. Switch the whole set at once — no mixing mismatched pieces.',
    analogyIcon: '🏭',
    problem:
      'Your app must produce groups of related products (WinButton + WinCheckbox, MacButton + MacCheckbox). Using separate factories or scattered `new` calls risks mixing incompatible products from different families.',
    solution:
      'Define abstract factories for each product family. Each concrete factory creates every product in that family. Client code works with abstract interfaces and swaps the whole factory to switch themes or platforms.',
    whenToUse: [
      'Products must be used together as a compatible family',
      'You want to switch entire product families at runtime or config time',
      'You need to hide concrete classes from high-level modules',
      'Examples: cross-platform UI kits, themed document suites, database driver stacks',
    ],
    whenNotToUse: [
      'You only create one type of object, not a family',
      'Product families rarely change — simpler factories may suffice',
      'Adding a new product type forces every factory to change',
    ],
    relatedPatterns: ['factory', 'builder', 'prototype'],
    codeBefore: `// Abstract Factory smell — risk of mixing incompatible UI parts
public class App {
    public void render(boolean isMac) {
        Button button = isMac ? new MacButton() : new WinButton();
        Checkbox box = new WinCheckbox(); // oops — Mac button with Windows checkbox
        button.render();
        box.render();
    }
}`,
    codeAfter: `// Abstract Factory — families stay consistent
public interface Button { void render(); }
public interface Checkbox { void render(); }

public interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

public class MacUIFactory implements UIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}

public class WinUIFactory implements UIFactory {
    public Button createButton() { return new WinButton(); }
    public Checkbox createCheckbox() { return new WinCheckbox(); }
}

public class App {
    private final UIFactory factory;

    public App(UIFactory factory) { this.factory = factory; }

    public void render() {
        Button button = factory.createButton();
        Checkbox box = factory.createCheckbox();
        button.render();
        box.render();
    }
}`,
    quiz: [
      {
        question: 'Abstract Factory is best when you need to…',
        options: [
          'Build one object step by step with many optional fields',
          'Create compatible groups of related products',
          'Copy an existing object instead of constructing from scratch',
          'Ensure only one global instance exists',
        ],
        correctIndex: 1,
        explanation:
          'Abstract Factory guarantees products from the same family work together — like a full Mac or Windows UI kit.',
      },
      {
        question: 'How does Abstract Factory differ from Factory Method?',
        options: [
          'It creates one product; Factory Method creates families',
          'It creates families of related products; Factory Method creates one product type',
          'It always returns a singleton',
          'It replaces inheritance with composition',
        ],
        correctIndex: 1,
        explanation:
          'Factory Method focuses on one product via a creator method; Abstract Factory produces entire compatible product families.',
      },
    ],
  },
  {
    slug: 'builder',
    name: 'Builder',
    category: 'creational',
    oneLiner: 'Assemble complex objects step by step, separating construction from the final representation.',
    analogy:
      'Ordering a custom laptop: pick CPU, RAM, storage, and color one step at a time. The salesperson (director) hands your choices to the builder, and you get a complete machine — not a pile of parts.',
    analogyIcon: '🔧',
    problem:
      'Constructors with dozens of parameters are unreadable and error-prone (`new House(4, true, false, "red", 2, ...)`). Subclassing every combination of optional settings leads to an explosion of types.',
    solution:
      'Move construction into a builder object with fluent step-by-step methods. A director (optional) defines assembly order. The same construction process can produce different representations using different builders.',
    whenToUse: [
      'Objects have many optional parts or configuration steps',
      'You want readable, incremental construction APIs',
      'The same assembly process should build different representations',
      'Examples: HTTP requests, SQL queries, meal combos, complex configs',
    ],
    whenNotToUse: [
      'The object is simple with few required fields',
      'All fields are mandatory and always set together',
      'You need compatible product families — Abstract Factory fits better',
    ],
    relatedPatterns: ['abstract-factory', 'factory', 'prototype'],
    codeBefore: `// Builder smell — telescoping constructor
public class HttpRequest {
    public HttpRequest(String url, String method, Map<String, String> headers,
                       String body, int timeoutMs, boolean followRedirects) {
        // Which boolean is which? Easy to mix up argument order
    }
}

// Client code becomes unreadable
HttpRequest req = new HttpRequest("/api", "POST", headers, json, 5000, true);`,
    codeAfter: `// Builder — step-by-step, readable construction
public class HttpRequest {
    private final String url;
    private final String method;
    private final Map<String, String> headers;
    private final String body;

    private HttpRequest(Builder builder) {
        this.url = builder.url;
        this.method = builder.method;
        this.headers = builder.headers;
        this.body = builder.body;
    }

    public static class Builder {
        private final String url;
        private String method = "GET";
        private Map<String, String> headers = new HashMap<>();
        private String body = "";

        public Builder(String url) { this.url = url; }

        public Builder method(String method) { this.method = method; return this; }
        public Builder header(String key, String value) { headers.put(key, value); return this; }
        public Builder body(String body) { this.body = body; return this; }

        public HttpRequest build() { return new HttpRequest(this); }
    }
}

HttpRequest req = new HttpRequest.Builder("/api")
    .method("POST")
    .header("Content-Type", "application/json")
    .body(json)
    .build();`,
    quiz: [
      {
        question: 'Builder helps most when…',
        options: [
          'You need exactly one shared instance',
          'Construction involves many optional steps or parameters',
          'You must notify many listeners on change',
          'You swap algorithms at runtime',
        ],
        correctIndex: 1,
        explanation:
          'Builder breaks complex construction into readable steps instead of giant constructors.',
      },
      {
        question: 'The Director role in Builder typically…',
        options: [
          'Defines the step-by-step assembly order',
          'Ensures only one instance of a class exists',
          'Clones existing objects for reuse',
          'Adapts incompatible interfaces',
        ],
        correctIndex: 0,
        explanation:
          'A director knows the recipe: which builder steps to call and in what order to produce a product.',
      },
    ],
  },
  {
    slug: 'prototype',
    name: 'Prototype',
    category: 'creational',
    oneLiner: 'Create new objects by copying an existing instance instead of building from scratch.',
    analogy:
      'Photocopying a filled-out form: duplicate the template with all its data, then tweak a few fields for the next person. Faster than rewriting every line from a blank page.',
    analogyIcon: '📋',
    problem:
      'Creating objects is expensive or complex (heavy DB load, deep graphs, many nested fields). Subclassing for every slight variation clutters the hierarchy. You need new instances that start nearly identical to an existing one.',
    solution:
      'Define a prototype interface with a clone method. Concrete classes implement cloning (shallow or deep copy). Clients ask for a copy of a prototype instead of calling constructors or factories for every variant.',
    whenToUse: [
      'Object creation is costlier than copying an existing instance',
      'You want to avoid subclassing just for preset configurations',
      'Objects are created in many variations that differ slightly from a base',
      'Examples: game entities, document templates, parsed config snapshots',
    ],
    whenNotToUse: [
      'Objects are trivial to construct with `new`',
      'Deep cloning cycles or shared mutable state make copies unsafe',
      'Every instance is unique with no reusable starting point',
    ],
    relatedPatterns: ['factory', 'abstract-factory', 'singleton'],
    codeBefore: `// Prototype smell — rebuilding complex objects from scratch
public class GameLevel {
    public Enemy createBoss() {
        Enemy boss = new Enemy();
        boss.setHealth(500);
        boss.setArmor(50);
        boss.setAbilities(List.of("fireball", "shield", "teleport"));
        // Repeat the same setup for every minion variant...
        return boss;
    }
}`,
    codeAfter: `// Prototype — clone a configured template
public interface Prototype<T> {
    T clone();
}

public class Enemy implements Prototype<Enemy> {
    private int health;
    private int armor;
    private List<String> abilities;

    public Enemy(int health, int armor, List<String> abilities) {
        this.health = health;
        this.armor = armor;
        this.abilities = new ArrayList<>(abilities);
    }

    public Enemy clone() {
        return new Enemy(health, armor, new ArrayList<>(abilities));
    }
}

public class GameLevel {
    private final Enemy bossTemplate =
        new Enemy(500, 50, List.of("fireball", "shield", "teleport"));

    public Enemy spawnBoss() {
        return bossTemplate.clone();
    }
}`,
    quiz: [
      {
        question: 'Prototype is ideal when…',
        options: [
          'Copying an existing object is cheaper than full construction',
          'You need families of related platform-specific products',
          'You wrap objects to add behavior in layers',
          'One object must notify many listeners',
        ],
        correctIndex: 0,
        explanation:
          'Prototype avoids expensive setup by cloning a preconfigured instance and adjusting it.',
      },
      {
        question: 'A key implementation concern with Prototype is…',
        options: [
          'Choosing between shallow and deep copy',
          'Ensuring only one instance exists globally',
          'Defining a factory method in every subclass',
          'Maintaining a list of observers',
        ],
        correctIndex: 0,
        explanation:
          'Cloning must correctly duplicate nested mutable state — shallow copies can share references unintentionally.',
      },
    ],
  },
];
