import type { Pattern } from './types';

export const structuralPatterns: Pattern[] = [
  {
    slug: 'adapter',
    name: 'Adapter',
    category: 'structural',
    oneLiner: 'Wrap a legacy or third-party API so it matches the interface your code expects — like a USB‑C to HDMI dongle.',
    analogy:
      'A travel plug adapter: your US charger has two flat prongs, but the wall outlet expects round pins. The adapter converts one shape into the other so both sides work — neither the charger nor the outlet changes.',
    analogyIcon: '🔌',
    problem:
      'You need to use an existing class or third-party library, but its interface does not match what your code expects. Rewriting either side is expensive, risky, or impossible.',
    solution:
      'Wrap the incompatible object in an adapter that implements the interface your client expects. The adapter translates calls from the expected interface into the adaptee\'s actual API.',
    whenToUse: [
      'Integrating legacy or third-party code with a different interface',
      'You cannot modify the source class (library, vendor API)',
      'You want a clean boundary between old and new systems',
      'Examples: payment gateway wrappers, legacy DB adapters, media format converters',
    ],
    whenNotToUse: [
      'You own both sides and can change interfaces directly',
      'The mismatch is tiny — a simple helper method may suffice',
      'Adapter logic becomes so complex it duplicates the adaptee',
    ],
    relatedPatterns: ['decorator', 'facade', 'proxy'],
    codeBefore: `// Adapter problem — client expects round plug, charger has flat prongs
public class RoundPlugSocket {
    public void connect(RoundPlug plug) {
        plug.insert();
    }
}

public class FlatCharger {
    public void plugIn() {
        System.out.println("Flat charger connected");
    }
}

// Client code breaks — FlatCharger is not a RoundPlug
public class App {
    public void charge(RoundPlugSocket socket, FlatCharger charger) {
        // socket.connect(charger); // won't compile
    }
}`,
    codeAfter: `// Adapter — translate flat charger into round plug interface
public interface RoundPlug {
    void insert();
}

public class FlatCharger {
    public void plugIn() {
        System.out.println("Flat charger connected");
    }
}

public class ChargerAdapter implements RoundPlug {
    private final FlatCharger charger;

    public ChargerAdapter(FlatCharger charger) {
        this.charger = charger;
    }

    public void insert() {
        charger.plugIn(); // translate insert() → plugIn()
    }
}

public class RoundPlugSocket {
    public void connect(RoundPlug plug) {
        plug.insert();
    }
}

// Client works with the expected interface
RoundPlugSocket socket = new RoundPlugSocket();
socket.connect(new ChargerAdapter(new FlatCharger()));`,
    quiz: [
      {
        question: 'Adapter is primarily used to…',
        options: [
          'Add new behavior to objects at runtime',
          'Convert one interface into another clients expect',
          'Ensure only one instance of a class exists',
          'Build complex objects step by step',
        ],
        correctIndex: 1,
        explanation:
          'Adapter wraps an incompatible object so it satisfies the interface your code already uses.',
      },
      {
        question: 'A travel plug converter is an analogy for…',
        options: ['Singleton', 'Adapter', 'Observer', 'Builder'],
        correctIndex: 1,
        explanation:
          'The adapter bridges two incompatible shapes — exactly what the Adapter pattern does for interfaces.',
      },
    ],
  },
  {
    slug: 'bridge',
    name: 'Bridge',
    category: 'structural',
    oneLiner: 'Split abstraction from implementation — same TV remote, different TV brands behind it.',
    analogy:
      'A TV remote (abstraction) and the TV brand (implementation): Sony, Samsung, or LG remotes can all use the same button layout, while each brand handles signals differently behind the scenes.',
    analogyIcon: '📺',
    problem:
      'You have multiple dimensions of variation — e.g., shapes (circle, square) and rendering engines (vector, raster). Subclassing every combination (VectorCircle, RasterCircle, VectorSquare…) leads to an explosion of classes.',
    solution:
      'Separate the abstraction from its implementation with two hierarchies connected by composition. The abstraction delegates work to an implementation interface, so each side can evolve independently.',
    whenToUse: [
      'Abstraction and implementation should be extended independently',
      'You want to hide platform or vendor details from clients',
      'Changes in implementation should not ripple through abstractions',
      'Examples: cross-platform UI, device drivers, remote controls',
    ],
    whenNotToUse: [
      'Only one implementation will ever exist',
      'Abstraction and implementation are tightly bound and never change',
      'A simple inheritance tree with few variants is enough',
    ],
    relatedPatterns: ['adapter', 'strategy', 'decorator'],
    codeBefore: `// Bridge smell — subclass explosion for every combo
abstract class Shape {
    abstract void draw();
}

class VectorCircle extends Shape {
    void draw() { System.out.println("Vector circle"); }
}

class RasterCircle extends Shape {
    void draw() { System.out.println("Raster circle"); }
}

class VectorSquare extends Shape {
    void draw() { System.out.println("Vector square"); }
}

class RasterSquare extends Shape {
    void draw() { System.out.println("Raster square"); }
}
// Every new shape × renderer = another class`,
    codeAfter: `// Bridge — abstraction and implementation vary separately
interface Renderer {
    void renderCircle();
    void renderSquare();
}

class VectorRenderer implements Renderer {
    public void renderCircle() { System.out.println("Vector circle"); }
    public void renderSquare() { System.out.println("Vector square"); }
}

class RasterRenderer implements Renderer {
    public void renderCircle() { System.out.println("Raster circle"); }
    public void renderSquare() { System.out.println("Raster square"); }
}

abstract class Shape {
    protected final Renderer renderer;
    Shape(Renderer renderer) { this.renderer = renderer; }
    abstract void draw();
}

class Circle extends Shape {
    Circle(Renderer renderer) { super(renderer); }
    void draw() { renderer.renderCircle(); }
}

class Square extends Shape {
    Square(Renderer renderer) { super(renderer); }
    void draw() { renderer.renderSquare(); }
}

// Mix any shape with any renderer at runtime
Shape circle = new Circle(new VectorRenderer());
circle.draw();`,
    quiz: [
      {
        question: 'Bridge separates…',
        options: [
          'Subject from observers',
          'Abstraction from implementation',
          'Client from factory',
          'Leaf nodes from composites',
        ],
        correctIndex: 1,
        explanation:
          'Bridge decouples the high-level abstraction from low-level implementation details via composition.',
      },
      {
        question: 'Subclass explosion (VectorCircle, RasterCircle, VectorSquare…) suggests…',
        options: ['Singleton', 'Bridge', 'Observer', 'Command'],
        correctIndex: 1,
        explanation:
          'When two dimensions of variation multiply classes, Bridge lets each dimension evolve on its own.',
      },
    ],
  },
  {
    slug: 'composite',
    name: 'Composite',
    category: 'structural',
    oneLiner: 'Treat files and folders the same — one delete on a folder removes everything inside.',
    analogy:
      'A folder on your computer: it can hold files (leaves) and subfolders (containers). You open, move, or delete a folder the same way whether it contains one file or a thousand nested items.',
    analogyIcon: '📁',
    problem:
      'You have a tree structure — org charts, UI components, file systems — where containers and leaves need similar operations. Client code branches on "is this a group or a single item?" everywhere.',
    solution:
      'Define a common component interface for both leaves and composites. Composites hold children and delegate operations to them. Clients treat individual objects and compositions uniformly.',
    whenToUse: [
      'You represent part-whole hierarchies (trees)',
      'Clients should ignore whether they work on one item or a group',
      'You want to add new component types without changing clients',
      'Examples: file systems, UI widget trees, org structures, menus',
    ],
    whenNotToUse: [
      'The structure is flat — a simple list is enough',
      'Leaves and composites have fundamentally different interfaces',
      'Type safety matters and you cannot share a common interface',
    ],
    relatedPatterns: ['decorator', 'iterator', 'flyweight'],
    codeBefore: `// Composite smell — client checks type for every operation
public class File {
    public void render() { System.out.println("File"); }
}

public class Folder {
    private List<Object> children = new ArrayList<>();

    public void add(Object child) { children.add(child); }

    public void render() {
        for (Object child : children) {
            if (child instanceof File) {
                ((File) child).render();
            } else if (child instanceof Folder) {
                ((Folder) child).render();
            }
        }
    }
}`,
    codeAfter: `// Composite — uniform interface for leaves and groups
public interface FileComponent {
    void render();
}

public class File implements FileComponent {
    private final String name;
    public File(String name) { this.name = name; }
    public void render() { System.out.println("File: " + name); }
}

public class Folder implements FileComponent {
    private final String name;
    private final List<FileComponent> children = new ArrayList<>();

    public Folder(String name) { this.name = name; }
    public void add(FileComponent child) { children.add(child); }

    public void render() {
        System.out.println("Folder: " + name);
        for (FileComponent child : children) {
            child.render();
        }
    }
}

// Client treats files and folders the same
FileComponent project = new Folder("project");
((Folder) project).add(new File("readme.md"));
project.render();`,
    quiz: [
      {
        question: 'Composite lets clients…',
        options: [
          'Swap algorithms at runtime',
          'Treat single objects and groups uniformly',
          'Wrap incompatible interfaces',
          'Share state across many small objects',
        ],
        correctIndex: 1,
        explanation:
          'Composite provides one interface for leaves and containers so clients need not distinguish them.',
      },
      {
        question: 'A file system with files and nested folders is a classic…',
        options: ['Proxy', 'Composite', 'Singleton', 'Strategy'],
        correctIndex: 1,
        explanation:
          'Files are leaves, folders are composites — both participate in the same tree operations.',
      },
    ],
  },
  {
    slug: 'decorator',
    name: 'Decorator',
    category: 'structural',
    oneLiner: 'Stack features at runtime — insurance addons on a base plan, not a subclass per combo.',
    analogy:
      'Coffee shop add-ons: start with plain coffee, then add milk, caramel, whipped cream — each layer wraps the drink and adds something on top.',
    analogyIcon: '☕',
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
    relatedPatterns: ['adapter', 'bridge', 'proxy'],
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
        explanation:
          'Decorators wrap a component and add responsibilities while keeping the same interface.',
      },
      {
        question: 'Java I/O streams (BufferedInputStream wrapping FileInputStream) use…',
        options: ['Singleton', 'Observer', 'Decorator', 'Strategy'],
        correctIndex: 2,
        explanation:
          'Stream wrappers add buffering, compression, etc. — classic Decorator in the JDK.',
      },
    ],
  },
  {
    slug: 'facade',
    name: 'Facade',
    category: 'structural',
    oneLiner: 'One “Order food” button hides kitchen, payment, and delivery behind a single call.',
    analogy:
      'A hotel concierge: you ask for "dinner reservations and a taxi at 7" — one request. Behind the scenes they call the restaurant, coordinate timing, and book the car. You don\'t deal with each service separately.',
    analogyIcon: '🏨',
    problem:
      'A subsystem has many classes, dependencies, and steps. Client code must know the right order of calls, which objects to create, and how subsystems interact — leading to fragile, scattered integration logic.',
    solution:
      'Introduce a facade class that exposes a few high-level methods. The facade delegates to subsystem classes internally. Clients interact with the simple facade instead of the messy subsystem.',
    whenToUse: [
      'A complex subsystem should be easy to use',
      'You want to reduce coupling between clients and many subsystem classes',
      'You need a clear entry point for a module or library',
      'Examples: home theater "watch movie", payment checkout, migration APIs',
    ],
    whenNotToUse: [
      'Clients need fine-grained control over every subsystem step',
      'The facade becomes a god object with too many unrelated methods',
      'You only need one class from the subsystem — call it directly',
    ],
    relatedPatterns: ['adapter', 'proxy', 'singleton'],
    codeBefore: `// Facade problem — client orchestrates many subsystem classes
public class HomeTheaterApp {
    public void watchMovie(String movie) {
        Projector projector = new Projector();
        Screen screen = new Screen();
        Amplifier amp = new Amplifier();
        DvdPlayer dvd = new DvdPlayer();

        projector.on();
        screen.down();
        amp.on();
        amp.setVolume(5);
        dvd.on();
        dvd.play(movie);
        // Client must know every step and dependency
    }
}`,
    codeAfter: `// Facade — one simple method hides subsystem complexity
public class HomeTheaterFacade {
    private final Projector projector;
    private final Screen screen;
    private final Amplifier amp;
    private final DvdPlayer dvd;

    public HomeTheaterFacade(Projector p, Screen s, Amplifier a, DvdPlayer d) {
        this.projector = p;
        this.screen = s;
        this.amp = a;
        this.dvd = d;
    }

    public void watchMovie(String movie) {
        projector.on();
        screen.down();
        amp.on();
        amp.setVolume(5);
        dvd.on();
        dvd.play(movie);
    }

    public void endMovie() {
        dvd.stop();
        dvd.off();
        amp.off();
        screen.up();
        projector.off();
    }
}

// Client uses one clean entry point
HomeTheaterFacade theater = new HomeTheaterFacade(
    new Projector(), new Screen(), new Amplifier(), new DvdPlayer()
);
theater.watchMovie("Inception");`,
    quiz: [
      {
        question: 'Facade simplifies…',
        options: [
          'Object creation across families of products',
          'Access to a complex subsystem with one easy interface',
          'Sharing intrinsic state between many objects',
          'Notifying observers when state changes',
        ],
        correctIndex: 1,
        explanation:
          'Facade wraps subsystem complexity behind a small set of convenient methods.',
      },
      {
        question: 'A hotel concierge handling dinner + taxi is an analogy for…',
        options: ['Composite', 'Facade', 'Flyweight', 'Bridge'],
        correctIndex: 1,
        explanation:
          'One high-level request coordinates multiple backend services — classic Facade.',
      },
    ],
  },
  {
    slug: 'flyweight',
    name: 'Flyweight',
    category: 'structural',
    oneLiner: 'Share heavy data (glyphs, textures) across many objects — one “A”, thousands of positions.',
    analogy:
      'A library lending the same copy of a bestseller to hundreds of readers: each reader has their own loan record (extrinsic), but they all reference one physical book (shared intrinsic state).',
    analogyIcon: '🔤',
    problem:
      'You create thousands or millions of similar objects (map tiles, text glyphs, game trees). Each object duplicates identical data (color, sprite, font metrics), wasting memory and slowing allocation.',
    solution:
      'Split state into intrinsic (shared, immutable) and extrinsic (context-specific). Store intrinsic state in flyweight objects managed by a factory. Clients pass extrinsic state when using flyweights.',
    whenToUse: [
      'Many objects share most of their state',
      'Intrinsic state can be made immutable and shared',
      'Memory is a bottleneck (games, editors, large visualizations)',
      'Examples: text rendering, map tiles, particle systems, chess pieces',
    ],
    whenNotToUse: [
      'Objects are mostly unique with little shared data',
      'Extrinsic state cannot be separated from intrinsic state',
      'The factory and lookup overhead outweigh memory savings',
    ],
    relatedPatterns: ['composite', 'factory', 'singleton'],
    codeBefore: `// Flyweight problem — every tree stores duplicate sprite data
public class Tree {
    private final int x, y;
    private final String name;
    private final String color;
    private final byte[] sprite; // same bytes repeated millions of times

    public Tree(int x, int y, String name, String color, byte[] sprite) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.color = color;
        this.sprite = sprite;
    }
}`,
    codeAfter: `// Flyweight — share intrinsic tree type, keep position extrinsic
public class TreeType {
    private final String name;
    private final String color;
    private final byte[] sprite;

    public TreeType(String name, String color, byte[] sprite) {
        this.name = name;
        this.color = color;
        this.sprite = sprite;
    }

    public void draw(int x, int y) {
        System.out.println("Draw " + name + " at " + x + "," + y);
    }
}

public class TreeFactory {
    private static final Map<String, TreeType> cache = new HashMap<>();

    public static TreeType getTreeType(String name, String color, byte[] sprite) {
        String key = name + color;
        return cache.computeIfAbsent(key, k -> new TreeType(name, color, sprite));
    }
}

public class Tree {
    private final int x, y;
    private final TreeType type;

    public Tree(int x, int y, TreeType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public void draw() { type.draw(x, y); }
}`,
    quiz: [
      {
        question: 'Flyweight reduces memory by…',
        options: [
          'Wrapping objects to add behavior',
          'Sharing intrinsic state across many instances',
          'Providing a simplified subsystem interface',
          'Splitting abstraction from implementation',
        ],
        correctIndex: 1,
        explanation:
          'Flyweight stores shared immutable state once and references it from many lightweight objects.',
      },
      {
        question: 'Rendering millions of identical map tiles is a good fit for…',
        options: ['Observer', 'Flyweight', 'Adapter', 'Command'],
        correctIndex: 1,
        explanation:
          'Tiles share the same image data (intrinsic); only position differs (extrinsic).',
      },
    ],
  },
  {
    slug: 'proxy',
    name: 'Proxy',
    category: 'structural',
    oneLiner: 'Stand in for the real object — thumbnail before HD video, lazy load, or access control.',
    analogy:
      'A personal assistant: colleagues ask the assistant to schedule meetings with the CEO. The assistant checks availability, filters requests, and only involves the CEO when needed — same role, controlled access.',
    analogyIcon: '🛡️',
    problem:
      'You need to control access to an object — lazy initialization, permission checks, logging, remote calls — but you want clients to use the same interface as if they talked to the real object directly.',
    solution:
      'Create a proxy that implements the same interface as the real subject. The proxy holds a reference to the subject and intercepts requests: deferring creation, checking permissions, or forwarding over the network.',
    whenToUse: [
      'Lazy initialization of expensive objects',
      'Access control, caching, or logging around a service',
      'Remote proxy for distributed or network resources',
      'Examples: image placeholders, security proxies, ORM lazy loading',
    ],
    whenNotToUse: [
      'Every call must hit the real object with zero overhead',
      'The proxy duplicates so much logic it becomes the real implementation',
      'A simple dependency injection wrapper is enough',
    ],
    relatedPatterns: ['decorator', 'adapter', 'facade'],
    codeBefore: `// Proxy problem — expensive image loaded even when not displayed
public class RealImage {
    private final String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk(); // slow, happens on every construction
    }

    private void loadFromDisk() {
        System.out.println("Loading " + filename);
    }

    public void display() {
        System.out.println("Displaying " + filename);
    }
}

public class Gallery {
    public void show(RealImage image) {
        image.display(); // image already loaded in constructor
    }
}`,
    codeAfter: `// Proxy — lazy load real image only when display() is called
public interface Image {
    void display();
}

public class RealImage implements Image {
    private final String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("Loading " + filename);
    }

    public void display() {
        System.out.println("Displaying " + filename);
    }
}

public class ImageProxy implements Image {
    private final String filename;
    private RealImage realImage;

    public ImageProxy(String filename) {
        this.filename = filename;
    }

    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename); // load on first use
        }
        realImage.display();
    }
}

// Gallery works with proxy — no load until display()
Image thumbnail = new ImageProxy("photo.jpg");
thumbnail.display();`,
    quiz: [
      {
        question: 'Proxy controls access by…',
        options: [
          'Subclassing every feature combination',
          'Providing a stand-in with the same interface as the real object',
          'Combining leaves and composites in a tree',
          'Sharing intrinsic state across instances',
        ],
        correctIndex: 1,
        explanation:
          'Proxy implements the subject interface and intercepts calls before delegating to the real object.',
      },
      {
        question: 'Lazy-loading a large image only when the user clicks "view" is…',
        options: ['Composite', 'Proxy', 'Bridge', 'Flyweight'],
        correctIndex: 1,
        explanation:
          'Virtual proxy defers expensive creation until the object is actually needed.',
      },
    ],
  },
];
