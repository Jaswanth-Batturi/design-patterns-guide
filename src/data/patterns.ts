export type PatternCategory = 'creational' | 'structural' | 'behavioral';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Pattern {
  slug: string;
  name: string;
  category: PatternCategory;
  oneLiner: string;
  analogy: string;
  problem: string;
  solution: string;
  whenToUse: string[];
  whenNotToUse: string[];
  relatedPatterns: string[];
  codeBefore: string;
  codeAfter: string;
  quiz: QuizQuestion[];
}

export const categoryLabels: Record<PatternCategory, string> = {
  creational: 'Creational',
  structural: 'Structural',
  behavioral: 'Behavioral',
};

export const patterns: Pattern[] = [
  {
    slug: 'observer',
    name: 'Observer',
    category: 'behavioral',
    oneLiner: 'When something changes, everyone who cares gets notified automatically.',
    analogy:
      'Think of a newsletter: you subscribe once, and whenever we publish a new article, you get an email. You don\'t keep checking the website — the publisher notifies you.',
    problem:
      'You have a subject (like order status) and many interested parties (email service, SMS, analytics, UI). If the subject directly calls each one, you get tight coupling, hard-to-test code, and pain every time you add a new listener.',
    solution:
      'The subject maintains a list of observers. Observers subscribe and unsubscribe. When state changes, the subject notifies all registered observers through a common interface — without knowing their concrete types.',
    whenToUse: [
      'One object\'s state change should update many others',
      'You want loose coupling between event producers and consumers',
      'You need dynamic subscribe/unsubscribe at runtime',
      'Examples: UI events, stock price feeds, notification systems',
    ],
    whenNotToUse: [
      'Only one listener exists — a simple callback is enough',
      'Order of notification matters and observers depend on each other',
      'Performance is critical with thousands of observers on hot paths',
    ],
    relatedPatterns: ['strategy', 'factory'],
    codeBefore: `// Tightly coupled — OrderStatus hard-codes every listener
public class OrderStatus {
    private String status;

    public void setStatus(String status) {
        this.status = status;
        new EmailService().send("Status: " + status);
        new SmsService().send("Status: " + status);
        new AnalyticsTracker().track(status);
        // Adding push notifications means editing this class again
    }
}`,
    codeAfter: `// Observer — subject notifies registered listeners
public interface OrderObserver {
    void onStatusChanged(String status);
}

public class OrderStatus {
    private String status;
    private final List<OrderObserver> observers = new ArrayList<>();

    public void subscribe(OrderObserver observer) {
        observers.add(observer);
    }

    public void setStatus(String status) {
        this.status = status;
        for (OrderObserver observer : observers) {
            observer.onStatusChanged(status);
        }
    }
}

public class EmailNotifier implements OrderObserver {
    public void onStatusChanged(String status) {
        System.out.println("Email: Order is now " + status);
    }
}`,
    quiz: [
      {
        question: 'What problem does Observer solve?',
        options: [
          'Creating objects without specifying exact classes',
          'Notifying many dependents when one object changes',
          'Ensuring only one instance of a class exists',
          'Wrapping incompatible interfaces',
        ],
        correctIndex: 1,
        explanation:
          'Observer decouples a subject from its dependents so all interested parties get notified when state changes.',
      },
      {
        question: 'Which real-world example fits Observer best?',
        options: [
          'A restaurant menu creating different dishes',
          'A newsletter subscription list',
          'A single remote control for one TV',
          'A travel plug adapter',
        ],
        correctIndex: 1,
        explanation:
          'Newsletter subscribers are notified when new content is published — classic Observer.',
      },
      {
        question: 'When should you avoid Observer?',
        options: [
          'When you have multiple UI components listening to model changes',
          'When only one simple callback is enough',
          'When building an event bus for a modular app',
          'When listeners can subscribe and unsubscribe dynamically',
        ],
        correctIndex: 1,
        explanation:
          'Observer adds structure you may not need if there is only one listener.',
      },
    ],
  },
  {
    slug: 'strategy',
    name: 'Strategy',
    category: 'behavioral',
    oneLiner: 'Swap algorithms or behaviors at runtime without changing the client code.',
    analogy:
      'Checkout at a store: you pick card, UPI, or cash. The checkout process is the same, but the payment behavior changes based on your choice.',
    problem:
      'You have multiple ways to do the same thing (sort, pay, compress, route). Giant if/else or switch statements spread across the codebase make it hard to add new options and test each behavior independently.',
    solution:
      'Define a family of algorithms behind a common interface. The client holds a reference to a strategy and delegates work to it. Swap strategies at runtime without touching client logic.',
    whenToUse: [
      'Many related behaviors differ only in algorithm steps',
      'You want to avoid conditionals for variant behavior',
      'Behaviors should be interchangeable at runtime',
      'Examples: payment methods, sorting, compression, routing',
    ],
    whenNotToUse: [
      'Only one behavior will ever exist',
      'Strategies share almost no common structure',
      'The choice of strategy is rare and never changes at runtime',
    ],
    relatedPatterns: ['factory', 'decorator'],
    codeBefore: `// Strategy smell — growing switch statement
public class PaymentProcessor {
    public void pay(String method, double amount) {
        if ("card".equals(method)) {
            System.out.println("Charging card: " + amount);
        } else if ("upi".equals(method)) {
            System.out.println("UPI transfer: " + amount);
        } else if ("cash".equals(method)) {
            System.out.println("Cash received: " + amount);
        }
        // Every new method = another branch here
    }
}`,
    codeAfter: `// Strategy — interchangeable payment algorithms
public interface PaymentStrategy {
    void pay(double amount);
}

public class CardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Charging card: " + amount);
    }
}

public class UpiPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("UPI transfer: " + amount);
    }
}

public class PaymentProcessor {
    private PaymentStrategy strategy;

    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void pay(double amount) {
        strategy.pay(amount);
    }
}`,
    quiz: [
      {
        question: 'Strategy is best when…',
        options: [
          'You need exactly one shared instance globally',
          'You want to swap behaviors without changing client code',
          'You need to adapt two incompatible interfaces',
          'You want to build objects step by step',
        ],
        correctIndex: 1,
        explanation:
          'Strategy encapsulates varying behavior behind a shared interface the client delegates to.',
      },
      {
        question: 'Payment methods (card, UPI, cash) map to…',
        options: ['Singleton', 'Observer', 'Strategy', 'Proxy'],
        correctIndex: 2,
        explanation: 'Each payment type is a different strategy for the same checkout operation.',
      },
    ],
  },
  {
    slug: 'factory',
    name: 'Factory',
    category: 'creational',
    oneLiner: 'Create objects without the client knowing which concrete class gets built.',
    analogy:
      'A restaurant menu: you order "burger" — the kitchen decides which recipe and ingredients to use. You don\'t walk into the kitchen to assemble it yourself.',
    problem:
      'Client code uses `new ConcreteClass()` everywhere. When you add new types or change construction logic, you must hunt through the codebase. Clients become coupled to concrete classes.',
    solution:
      'Move object creation into a factory (method or class). The client asks for a product by type or name; the factory returns the right instance. Construction details stay in one place.',
    whenToUse: [
      'Object creation logic is complex or centralized',
      'Client should not depend on concrete product classes',
      'You may add new product types without changing clients',
      'Examples: DB drivers, UI components, document exporters',
    ],
    whenNotToUse: [
      'Construction is trivial — `new MyClass()` is fine',
      'You only ever create one concrete type',
      'Factory becomes a giant switch — consider Registry or Builder',
    ],
    relatedPatterns: ['strategy', 'singleton'],
    codeBefore: `// Factory smell — client picks concrete classes
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
    codeAfter: `// Factory — creation centralized, client stays simple
public interface Exporter {
    void export(String data);
}

public class ExporterFactory {
    public Exporter create(String type) {
        switch (type) {
            case "pdf": return new PdfExporter();
            case "excel": return new ExcelExporter();
            default: throw new IllegalArgumentException("Unknown type: " + type);
        }
    }
}

public class ReportApp {
    private final ExporterFactory factory = new ExporterFactory();

    public void export(String type, String data) {
        Exporter exporter = factory.create(type);
        exporter.export(data);
    }
}`,
    quiz: [
      {
        question: 'Factory Method / Factory pattern mainly helps with…',
        options: [
          'Notifying listeners of state changes',
          'Decoupling object creation from usage',
          'Adding features to objects dynamically',
          'Limiting instances to one per class',
        ],
        correctIndex: 1,
        explanation: 'Factories hide which concrete class is instantiated from the code that uses it.',
      },
      {
        question: 'Restaurant menu → kitchen is an analogy for…',
        options: ['Observer', 'Factory', 'Decorator', 'Command'],
        correctIndex: 1,
        explanation: 'You request a product; the factory (kitchen) handles how it is created.',
      },
    ],
  },
  {
    slug: 'singleton',
    name: 'Singleton',
    category: 'creational',
    oneLiner: 'Ensure a class has only one instance and provide a global access point to it.',
    analogy:
      'One manager per store, one president per country, one remote paired to one TV — there should only be one authoritative instance.',
    problem:
      'Some resources must be shared globally (config, connection pool, logger). Multiple instances cause inconsistent state, wasted memory, or conflicting access to scarce resources.',
    solution:
      'Hide the constructor, expose a static method that returns the single instance (often lazy-initialized). All code uses that same instance.',
    whenToUse: [
      'Exactly one shared instance must coordinate system-wide access',
      'The instance is expensive to create and reused everywhere',
      'Examples: app config, thread pool, hardware driver access',
    ],
    whenNotToUse: [
      'You use it as a global dumping ground for unrelated state',
      'You need multiple instances in tests or multi-tenant apps',
      'Dependency injection can provide a shared instance instead',
      'It hides dependencies and makes code harder to test',
    ],
    relatedPatterns: ['factory'],
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
        explanation: 'Singleton restricts instantiation so one shared object is used application-wide.',
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
    slug: 'decorator',
    name: 'Decorator',
    category: 'structural',
    oneLiner: 'Add responsibilities to an object dynamically without subclassing every combination.',
    analogy:
      'Coffee shop add-ons: start with plain coffee, then add milk, caramel, whipped cream — each layer wraps the drink and adds something on top.',
    problem:
      'You need many combinations of features (buffered + compressed stream, pizza with various toppings). Subclass explosion: BufferedGzipFileStream, GzipBufferedFileStream, etc.',
    solution:
      'Wrap the component in decorator objects that implement the same interface. Each decorator adds behavior and can delegate to the wrapped object. Stack decorators like layers.',
    whenToUse: [
      'Add responsibilities at runtime independently',
      'Subclassing every feature combination is impractical',
      'You want transparent wrapping (client uses same interface)',
      'Examples: I/O streams, UI styling, middleware pipelines',
    ],
    whenNotToUse: [
      'Object structure is fixed at compile time',
      'A simple inheritance tree with few variants is enough',
      'Decorators would be ordered incorrectly and break behavior',
    ],
    relatedPatterns: ['strategy', 'factory'],
    codeBefore: `// Decorator smell — subclass explosion
abstract class Pizza { abstract double cost(); }
class PlainPizza extends Pizza { double cost() { return 5.0; } }
class CheesePizza extends Pizza { double cost() { return 6.0; } }
class CheeseOlivePizza extends Pizza { double cost() { return 7.5; } }
// Every combo needs a new class...`,
    codeAfter: `// Decorator — stack features dynamically
interface Pizza {
    double cost();
}

class PlainPizza implements Pizza {
    public double cost() { return 5.0; }
}

class PizzaDecorator implements Pizza {
    protected final Pizza base;
    PizzaDecorator(Pizza base) { this.base = base; }
    public double cost() { return base.cost(); }
}

class Cheese extends PizzaDecorator {
    public double cost() { return base.cost() + 1.0; }
}

class Olives extends PizzaDecorator {
    public double cost() { return base.cost() + 0.5; }
}

// Plain + cheese + olives at runtime
Pizza order = new Olives(new Cheese(new PlainPizza()));`,
    quiz: [
      {
        question: 'Decorator lets you…',
        options: [
          'Create families of related objects',
          'Add behavior by wrapping objects in layers',
          'Notify many listeners on change',
          'Ensure a single global instance',
        ],
        correctIndex: 1,
        explanation: 'Decorators wrap a component and add responsibilities while keeping the same interface.',
      },
      {
        question: 'Java I/O streams (BufferedInputStream wrapping FileInputStream) use…',
        options: ['Singleton', 'Observer', 'Decorator', 'Strategy'],
        correctIndex: 2,
        explanation: 'Stream wrappers add buffering, compression, etc. — classic Decorator in the JDK.',
      },
    ],
  },
];

export function getPattern(slug: string): Pattern | undefined {
  return patterns.find((p) => p.slug === slug);
}

export interface FinderRule {
  keywords: string[];
  patternSlug: string;
  hint: string;
}

export const finderRules: FinderRule[] = [
  {
    keywords: ['notify', 'subscribe', 'listen', 'event', 'observer', 'update', 'publish'],
    patternSlug: 'observer',
    hint: 'One source, many listeners that react to changes',
  },
  {
    keywords: ['algorithm', 'behavior', 'payment', 'sort', 'strategy', 'swap', 'switch method'],
    patternSlug: 'strategy',
    hint: 'Interchangeable behaviors behind one interface',
  },
  {
    keywords: ['create', 'factory', 'instantiate', 'new object', 'build product', 'constructor'],
    patternSlug: 'factory',
    hint: 'Centralize object creation away from clients',
  },
  {
    keywords: ['single', 'singleton', 'one instance', 'global', 'shared config'],
    patternSlug: 'singleton',
    hint: 'Exactly one shared instance for the whole app',
  },
  {
    keywords: ['wrap', 'layer', 'addon', 'decorate', 'extend', 'stack', 'buffer'],
    patternSlug: 'decorator',
    hint: 'Add features by wrapping without subclass explosion',
  },
];
