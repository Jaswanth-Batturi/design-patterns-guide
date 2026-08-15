import type { Pattern } from './types';

export const behavioralPatterns: Pattern[] = [
  {
    slug: 'chain-of-responsibility',
    name: 'Chain of Responsibility',
    category: 'behavioral',
    oneLiner: 'Pass a request along a chain of handlers until one of them processes it.',
    analogy:
      'Customer support tiers: your ticket goes to L1, then L2, then engineering — each agent either handles it or passes it to the next level. You never need to know who finally solves it.',
    analogyIcon: '🔗',
    problem:
      'A request might be handled by several objects, but you do not know in advance which one should act. Putting giant if/else chains or nested conditionals in the sender couples it to every handler and makes adding new handlers painful.',
    solution:
      'Link handlers into a chain. Each handler decides whether to process the request or forward it to the next link. The sender only talks to the first handler; the chain itself routes the work.',
    whenToUse: [
      'More than one object may handle a request, and the handler is not known upfront',
      'You want to decouple senders from receivers',
      'Handler order matters and should be configurable at runtime',
      'Examples: middleware pipelines, logging filters, approval workflows',
    ],
    whenNotToUse: [
      'Exactly one handler will always process every request',
      'The chain becomes so long that debugging which link failed is harder than a simple dispatch table',
      'Requests must be handled by multiple handlers in a fixed, explicit sequence you control in one place',
    ],
    relatedPatterns: ['decorator', 'command'],
    codeBefore: `// Chain smell — sender knows every handler and their rules
public class SupportDesk {
    public void handleTicket(String issue, int priority) {
        if (priority <= 1) {
            new Level1Agent().resolve(issue);
        } else if (priority <= 3) {
            new Level2Agent().resolve(issue);
        } else {
            new EngineeringTeam().resolve(issue);
        }
        // New tier? Edit this method again.
    }
}`,
    codeAfter: `// Chain of Responsibility — handlers forward or process
public abstract class SupportHandler {
    private SupportHandler next;

    public SupportHandler setNext(SupportHandler next) {
        this.next = next;
        return next;
    }

    public void handle(String issue, int priority) {
        if (canHandle(priority)) {
            resolve(issue);
        } else if (next != null) {
            next.handle(issue, priority);
        }
    }

    protected abstract boolean canHandle(int priority);
    protected abstract void resolve(String issue);
}

public class Level1Handler extends SupportHandler {
    protected boolean canHandle(int priority) { return priority <= 1; }
    protected void resolve(String issue) {
        System.out.println("L1 resolved: " + issue);
    }
}

// Build chain: L1 -> L2 -> Engineering
SupportHandler chain = new Level1Handler();
chain.setNext(new Level2Handler()).setNext(new EngineeringHandler());
chain.handle("Login broken", 4);`,
    quiz: [
      {
        question: 'Chain of Responsibility helps when…',
        options: [
          'You need exactly one global instance of a class',
          'Multiple objects might handle a request and the sender should not pick',
          'You want to clone object state for undo',
          'You need to traverse a collection without exposing its internals',
        ],
        correctIndex: 1,
        explanation:
          'The sender passes the request to the first handler; each link either processes it or forwards it along the chain.',
      },
      {
        question: 'HTTP middleware (auth → logging → handler) is a classic example of…',
        options: ['Iterator', 'Chain of Responsibility', 'Memento', 'Visitor'],
        correctIndex: 1,
        explanation:
          'Each middleware can short-circuit or pass the request to the next layer — a textbook chain.',
      },
    ],
  },
  {
    slug: 'command',
    name: 'Command',
    category: 'behavioral',
    oneLiner: 'Turn a request into a stand-alone object you can queue, log, or undo.',
    analogy:
      'A restaurant order ticket: the waiter writes "burger, no onions" on a slip and hands it to the kitchen. The ticket is the command — it can be queued, rerouted, or voided without the waiter cooking the meal.',
    analogyIcon: '📝',
    problem:
      'UI buttons and menu items directly call business logic. You cannot easily undo actions, replay macros, queue work for later, or decouple the object that triggers an action from the object that performs it.',
    solution:
      'Encapsulate each action as a command object with an execute() method (and optionally undo()). Invokers hold commands; receivers do the real work. Commands become first-class values you can store, schedule, and compose.',
    whenToUse: [
      'You need undo/redo, transaction logs, or macro recording',
      'Callers should not depend on receiver implementation details',
      'Operations must be queued, retried, or run on a schedule',
      'Examples: text editor undo, remote controls, job queues',
    ],
    whenNotToUse: [
      'Actions are trivial one-liners with no undo or logging needs',
      'Every command would duplicate the same boilerplate with no shared structure',
      'Synchronous direct calls are enough and will always be enough',
    ],
    relatedPatterns: ['memento', 'strategy'],
    codeBefore: `// Command smell — button tightly coupled to receiver logic
public class EditorToolbar {
    public void onBoldClicked(TextEditor editor) {
        editor.toggleBold(); // No undo, no queue, no macro support
    }

    public void onSaveClicked(TextEditor editor, File file) {
        editor.save(file);
    }
}`,
    codeAfter: `// Command — action encapsulated as an object
public interface Command {
    void execute();
    void undo();
}

public class BoldCommand implements Command {
    private final TextEditor editor;

    public BoldCommand(TextEditor editor) { this.editor = editor; }

    public void execute() { editor.toggleBold(); }
    public void undo() { editor.toggleBold(); }
}

public class ToolbarButton {
    private Command command;

    public void setCommand(Command command) { this.command = command; }
    public void click() { command.execute(); }
}

// Undo stack
Deque<Command> history = new ArrayDeque<>();
history.push(new BoldCommand(editor));`,
    quiz: [
      {
        question: 'Command pattern is especially useful for…',
        options: [
          'Swapping sorting algorithms at runtime',
          'Undo/redo and queuing operations as objects',
          'Ensuring only one database connection exists',
          'Visiting every node in an object structure',
        ],
        correctIndex: 1,
        explanation:
          'Commands encapsulate actions so you can store, replay, and reverse them independently of who triggered them.',
      },
      {
        question: 'A restaurant order slip handed to the kitchen maps to…',
        options: ['Observer', 'Command', 'State', 'Mediator'],
        correctIndex: 1,
        explanation:
          'The slip decouples who takes the order from who executes it — exactly what Command does.',
      },
    ],
  },
  {
    slug: 'interpreter',
    name: 'Interpreter',
    category: 'behavioral',
    oneLiner: 'Define a grammar for a mini-language and interpret sentences using a class per rule.',
    analogy:
      'Reading sheet music: each symbol (note, rest, sharp) has a meaning, and musicians combine them following notation rules to perform a piece. The notation is the grammar; playing it is interpretation.',
    analogyIcon: '🎼',
    problem:
      'You need to evaluate or execute simple domain-specific expressions (search filters, permission rules, math formulas). Scattering parsing logic in strings and regex makes rules hard to extend, test, and compose.',
    solution:
      'Model grammar rules as classes implementing a common interpret interface. Build an abstract syntax tree from tokens; each node knows how to evaluate itself in a context. New grammar rules become new classes instead of growing switch statements.',
    whenToUse: [
      'You have a simple, stable grammar used repeatedly',
      'Efficiency is not the top concern — clarity and extensibility are',
      'Rules combine recursively (AND, OR, NOT, grouping)',
      'Examples: search query DSLs, rule engines, template expressions',
    ],
    whenNotToUse: [
      'The language is complex — use a parser generator or existing engine instead',
      'Performance on hot paths matters more than interpretive flexibility',
      'You only evaluate one-off expressions rarely',
    ],
    relatedPatterns: ['composite', 'iterator', 'visitor'],
    codeBefore: `// Interpreter smell — brittle string parsing everywhere
public class AccessControl {
    public boolean canAccess(String rule, User user) {
        if (rule.contains("AND")) {
            String[] parts = rule.split(" AND ");
            return check(parts[0], user) && check(parts[1], user);
        }
        if (rule.startsWith("role:")) {
            return user.hasRole(rule.substring(5));
        }
        return false;
        // Every new operator means more string hacks
    }
}`,
    codeAfter: `// Interpreter — grammar as composable expression tree
public interface Expression {
    boolean interpret(User user);
}

public class RoleExpression implements Expression {
    private final String role;
    public RoleExpression(String role) { this.role = role; }
    public boolean interpret(User user) { return user.hasRole(role); }
}

public class AndExpression implements Expression {
    private final Expression left, right;
    public AndExpression(Expression left, Expression right) {
        this.left = left; this.right = right;
    }
    public boolean interpret(User user) {
        return left.interpret(user) && right.interpret(user);
    }
}

// role:admin AND role:editor
Expression rule = new AndExpression(
    new RoleExpression("admin"),
    new RoleExpression("editor")
);
boolean allowed = rule.interpret(currentUser);`,
    quiz: [
      {
        question: 'Interpreter is a good fit when…',
        options: [
          'You need to traverse a binary tree without recursion',
          'You have a simple, recurring grammar to evaluate',
          'You want to snapshot object state for undo',
          'You need one object to coordinate many colleagues',
        ],
        correctIndex: 1,
        explanation:
          'Interpreter shines for small domain languages where each grammar rule maps cleanly to a class.',
      },
      {
        question: 'Building an AND/OR rule engine from composable expression objects is…',
        options: ['Visitor', 'Interpreter', 'Memento', 'Template Method'],
        correctIndex: 1,
        explanation:
          'Composite expression nodes that evaluate themselves in context are the core of Interpreter.',
      },
    ],
  },
  {
    slug: 'iterator',
    name: 'Iterator',
    category: 'behavioral',
    oneLiner: 'Access elements of a collection one by one without exposing how it is stored.',
    analogy:
      'A TV remote "next channel" button: you flip through channels without knowing whether the TV stores them as a list, a hash map, or a broadcast scan. The remote is the iterator; the channel list is the collection.',
    analogyIcon: '📺',
    problem:
      'Clients that loop over collections become coupled to internal structure (arrays vs linked lists vs trees). Multiple traversal strategies (forward, reverse, filtered) would duplicate traversal logic or leak internals.',
    solution:
      'Extract traversal into a separate iterator object with hasNext() and next(). The collection exposes a factory for iterators; clients use the uniform interface regardless of underlying storage.',
    whenToUse: [
      'You want uniform traversal over different collection types',
      'Multiple traversal orders or filters are needed',
      'You must hide internal representation from clients',
      'Examples: paginated APIs, file directory walks, custom data structures',
    ],
    whenNotToUse: [
      'You only ever use standard Java collections with enhanced for-loops',
      'Traversal is trivial and will never vary',
      'Iterator overhead matters on extremely hot inner loops with simple arrays',
    ],
    relatedPatterns: ['composite', 'visitor'],
    codeBefore: `// Iterator smell — client knows internal structure
public class Playlist {
    private String[] tracks;

    public void printAll() {
        for (int i = 0; i < tracks.length; i++) {
            System.out.println(tracks[i]);
        }
        // Client cannot traverse without knowing it's an array
    }
}`,
    codeAfter: `// Iterator — uniform traversal interface
public interface PlaylistIterator {
    boolean hasNext();
    String next();
}

public class ArrayPlaylist implements Playlist {
    private String[] tracks;

    public PlaylistIterator iterator() {
        return new ArrayPlaylistIterator(tracks);
    }
}

public class ArrayPlaylistIterator implements PlaylistIterator {
    private final String[] tracks;
    private int index = 0;

    public boolean hasNext() { return index < tracks.length; }
    public String next() { return tracks[index++]; }
}

// Client code stays the same for any backing store
PlaylistIterator it = playlist.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}`,
    quiz: [
      {
        question: 'Iterator lets clients…',
        options: [
          'Create objects without knowing concrete classes',
          'Walk a collection without depending on its internal structure',
          'Notify dependents when state changes',
          'Save and restore previous object state',
        ],
        correctIndex: 1,
        explanation:
          'Iterator separates traversal logic from the collection so clients use a stable hasNext/next API.',
      },
      {
        question: 'Java\'s enhanced for-loop over a List works because List implements…',
        options: ['Iterable', 'Serializable', 'Cloneable', 'Comparable'],
        correctIndex: 0,
        explanation:
          'Iterable provides iterator(); the for-loop uses that iterator under the hood — the pattern built into the JDK.',
      },
    ],
  },
  {
    slug: 'mediator',
    name: 'Mediator',
    category: 'behavioral',
    oneLiner: 'Centralize chaotic many-to-many colleague communication through one coordinator.',
    analogy:
      'Air traffic control: pilots do not negotiate landing slots with each other directly. They talk to the tower, which coordinates who lands when. The tower is the mediator.',
    analogyIcon: '🗼',
    problem:
      'Objects talk to each other directly in a web of references. Adding a new colleague means updating many others. The system becomes hard to understand, test, and change because behavior is scattered across N² connections.',
    solution:
      'Introduce a mediator that owns how colleagues interact. Colleagues only know the mediator; they send and receive messages through it. Coordination logic lives in one place instead of every pairwise link.',
    whenToUse: [
      'Many objects interact in complex, changing ways',
      'Reusing a colleague in another context is hard because of tangled dependencies',
      'You want to replace subclassing with centralized coordination',
      'Examples: chat rooms, dialog wizards, UI component orchestration',
    ],
    whenNotToUse: [
      'Only two simple objects communicate — direct references are fine',
      'The mediator becomes a god object with all business logic dumped into it',
      'Colleagues are already loosely coupled through events',
    ],
    relatedPatterns: ['observer', 'facade'],
    codeBefore: `// Mediator smell — colleagues reference each other directly
public class ChatUser {
    private ChatUser partner;

    public void setPartner(ChatUser partner) { this.partner = partner; }

    public void send(String message) {
        partner.receive(this.name, message);
    }
    // Group chat? Every user needs references to everyone else.
}`,
    codeAfter: `// Mediator — colleagues talk through a coordinator
public interface ChatMediator {
    void sendMessage(String from, String message);
    void addUser(ChatUser user);
}

public class ChatRoom implements ChatMediator {
    private final List<ChatUser> users = new ArrayList<>();

    public void addUser(ChatUser user) { users.add(user); }

    public void sendMessage(String from, String message) {
        for (ChatUser user : users) {
            if (!user.getName().equals(from)) {
                user.receive(from, message);
            }
        }
    }
}

public class ChatUser {
    private final ChatMediator room;
    public void send(String message) { room.sendMessage(name, message); }
}`,
    quiz: [
      {
        question: 'Mediator reduces…',
        options: [
          'The number of direct connections between colleagues',
          'The number of classes in a factory hierarchy',
          'Memory used by flyweight shared state',
          'The depth of inheritance trees for decorators',
        ],
        correctIndex: 0,
        explanation:
          'Instead of N×(N−1) colleague links, each object talks only to the mediator.',
      },
      {
        question: 'Air traffic control coordinating pilots is an analogy for…',
        options: ['Observer', 'Mediator', 'Chain of Responsibility', 'Strategy'],
        correctIndex: 1,
        explanation:
          'The tower centralizes coordination so pilots do not negotiate directly with each other.',
      },
    ],
  },
  {
    slug: 'memento',
    name: 'Memento',
    category: 'behavioral',
    oneLiner: 'Capture and externalize object state so you can restore it later without breaking encapsulation.',
    analogy:
      'Save points in a video game: you freeze the exact game state to disk and reload it after a mistake. You do not manually copy every variable — the game hands you a restore point.',
    analogyIcon: '💾',
    problem:
      'You need snapshots for undo, rollback, or checkpoints, but exposing all internal fields breaks encapsulation. Storing copies by reaching into private state couples caretakers to originator internals.',
    solution:
      'The originator creates a memento holding a snapshot of its state. Only the originator can read or restore from that memento; caretakers store mementos but cannot tamper with internals. Undo becomes restoring a saved memento.',
    whenToUse: [
      'You need undo, redo, or transactional rollback',
      'Direct exposure of internal state would violate encapsulation',
      'Snapshots are created and restored at well-defined points',
      'Examples: text editors, game saves, form draft recovery',
    ],
    whenNotToUse: [
      'State is huge and copying it on every change is too expensive',
      'You can persist state openly without encapsulation concerns',
      'A simple command with inverse operations is enough for undo',
    ],
    relatedPatterns: ['command', 'prototype'],
    codeBefore: `// Memento smell — caretaker reaches into private fields
public class Editor {
    private String text;
    private int cursor;

    // Exposed for "undo" — breaks encapsulation
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}

public class History {
    private List<String> snapshots = new ArrayList<>();
    public void save(Editor editor) { snapshots.add(editor.getText()); }
}`,
    codeAfter: `// Memento — snapshot without exposing internals
public class Editor {
    private String text;

    public Memento save() { return new Memento(text); }
    public void restore(Memento memento) { this.text = memento.getState(); }

    public static class Memento {
        private final String state;
        private Memento(String state) { this.state = state; }
        private String getState() { return state; }
    }
}

public class History {
    private final Deque<Editor.Memento> stack = new ArrayDeque<>();

    public void push(Editor editor) { stack.push(editor.save()); }
    public void undo(Editor editor) {
        if (!stack.isEmpty()) editor.restore(stack.pop());
    }
}`,
    quiz: [
      {
        question: 'Memento preserves encapsulation because…',
        options: [
          'The caretaker can modify any field in the originator',
          'Only the originator can read or restore its own snapshot',
          'Snapshots are stored as public global variables',
          'The memento exposes all private fields to clients',
        ],
        correctIndex: 1,
        explanation:
          'Caretakers hold opaque mementos; the originator alone knows how to interpret and apply them.',
      },
      {
        question: 'Video game save points are a real-world example of…',
        options: ['Iterator', 'Memento', 'Visitor', 'Interpreter'],
        correctIndex: 1,
        explanation:
          'A save captures full state for later restoration — the essence of Memento.',
      },
    ],
  },
  {
    slug: 'observer',
    name: 'Observer',
    category: 'behavioral',
    oneLiner: 'One thing changes → everyone who cares gets told automatically.',
    analogy:
      'Think of a newsletter: you subscribe once, and whenever we publish a new article, you get an email. You do not keep checking the website — the publisher notifies you.',
    analogyIcon: '📬',
    sceneSteps: [
      'You subscribe to a food blog newsletter',
      'The blog publishes a new recipe',
      'You get an email instantly — no need to keep refreshing the site',
    ],
    problem:
      'You have a subject (like order status) and many interested parties (email service, SMS, analytics, UI). If the subject directly calls each one, you get tight coupling, hard-to-test code, and pain every time you add a new listener.',
    solution:
      'The subject maintains a list of observers. Observers subscribe and unsubscribe. When state changes, the subject notifies all registered observers through a common interface — without knowing their concrete types.',
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
      'Compare the two tabs: without Observer, setStatus() is a growing list of hard-coded services. With Observer, setStatus() loops over subscribers — that is the whole trick.',
    tryItSteps: [
      'Wait for the editor below (spinning loader disappears).',
      'Click Run ▶ inside the dark editor box (top-right of that box).',
      'You should see Email and SMS lines when status becomes SHIPPED.',
      'Add a third line: order.subscribe(s -> System.out.println("Push: " + s)); and Run again.',
    ],
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
    relatedPatterns: ['mediator', 'strategy'],
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
    ],
  },
  {
    slug: 'state',
    name: 'State',
    category: 'behavioral',
    oneLiner: 'Let an object change its behavior when its internal state changes.',
    analogy:
      'A traffic light: the same pole behaves differently in red, yellow, and green — stop, caution, go. The light does not use giant if/else blocks; its current state dictates what happens next.',
    analogyIcon: '🚦',
    problem:
      'An object behaves differently based on internal mode (draft, submitted, approved). Conditionals on a status field sprawl across methods. Adding a new state means editing every method that branches on the current mode.',
    solution:
      'Encapsulate each mode as a state class implementing a common interface. The context delegates behavior to its current state object and transitions by swapping state instances. State-specific logic lives in one class per mode.',
    whenToUse: [
      'Behavior depends on an object\'s mode and modes change at runtime',
      'Large conditionals on status/type enums clutter the context',
      'State transitions are well-defined and localized',
      'Examples: order workflows, TCP connections, media players, document editors',
    ],
    whenNotToUse: [
      'Only two trivial states with one or two branches total',
      'State never changes after construction',
      'State pattern would create more classes than the conditionals it replaces',
    ],
    relatedPatterns: ['strategy', 'bridge'],
    codeBefore: `// State smell — behavior scattered across status checks
public class Order {
    private String status = "NEW";

    public void ship() {
        if ("PAID".equals(status)) {
            status = "SHIPPED";
            System.out.println("Order shipped");
        } else if ("SHIPPED".equals(status)) {
            throw new IllegalStateException("Already shipped");
        }
        // Every action repeats similar if/else chains
    }

    public void cancel() {
        if ("SHIPPED".equals(status)) {
            throw new IllegalStateException("Cannot cancel");
        }
        status = "CANCELLED";
    }
}`,
    codeAfter: `// State — behavior lives in state objects
public interface OrderState {
    void ship(OrderContext context);
    void cancel(OrderContext context);
}

public class PaidState implements OrderState {
    public void ship(OrderContext context) {
        context.setState(new ShippedState());
        System.out.println("Order shipped");
    }
    public void cancel(OrderContext context) {
        context.setState(new CancelledState());
    }
}

public class OrderContext {
    private OrderState state = new NewState();
    public void setState(OrderState state) { this.state = state; }
    public void ship() { state.ship(this); }
    public void cancel() { state.cancel(this); }
}`,
    quiz: [
      {
        question: 'State pattern is best when…',
        options: [
          'An object\'s behavior changes based on its current mode',
          'You need to add features by wrapping objects in layers',
          'You want to interpret a domain-specific grammar',
          'You need a single shared global configuration object',
        ],
        correctIndex: 0,
        explanation:
          'State encapsulates mode-specific behavior and makes transitions explicit via state objects.',
      },
      {
        question: 'How does State differ from Strategy?',
        options: [
          'State objects change automatically as the context evolves; Strategy is usually chosen by the client',
          'State is creational; Strategy is structural',
          'Strategy cannot be swapped at runtime',
          'State always requires exactly two implementations',
        ],
        correctIndex: 0,
        explanation:
          'Both delegate to pluggable objects, but State models internal lifecycle transitions; Strategy models interchangeable algorithms.',
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
    analogyIcon: '💳',
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
    slug: 'template-method',
    name: 'Template Method',
    category: 'behavioral',
    oneLiner: 'Define the skeleton of an algorithm in a base class and let subclasses fill in the steps.',
    analogy:
      'Making tea or coffee: boil water, brew, pour into a cup, add extras. The overall recipe is fixed, but brewing and extras differ. The template is "hot drink"; subclasses supply the variations.',
    analogyIcon: '☕',
    problem:
      'Several classes share the same overall workflow but differ in specific steps. Copy-pasting the full algorithm into each subclass duplicates structure and makes fixing the shared flow a maintenance nightmare.',
    solution:
      'Put the invariant algorithm steps in an abstract base class template method. Call abstract or hook methods where subclasses customize behavior. Subclasses cannot reorder the skeleton — only override the variable parts.',
    whenToUse: [
      'Multiple classes follow the same high-level steps with different details',
      'You want to control extension points and prevent subclasses from changing the algorithm order',
      'Duplicated "boilerplate then customize" logic appears across classes',
      'Examples: data parsers, servlet lifecycle, JUnit test cases',
    ],
    whenNotToUse: [
      'Algorithms differ entirely — Strategy or composition fits better',
      'You need runtime swapping of steps, not compile-time subclassing',
      'Deep inheritance hierarchies would be harder to follow than a simple pipeline',
    ],
    relatedPatterns: ['strategy', 'factory-method'],
    codeBefore: `// Template Method smell — duplicated workflow in every class
public class PdfReport {
    public void generate() {
        openConnection();
        fetchData();
        formatAsPdf();
        sendReport();
        closeConnection();
    }
}

public class ExcelReport {
    public void generate() {
        openConnection();
        fetchData();
        formatAsExcel(); // Only this step differs
        sendReport();
        closeConnection();
    }
}`,
    codeAfter: `// Template Method — shared skeleton, customizable steps
public abstract class ReportGenerator {
    public final void generate() {
        openConnection();
        fetchData();
        formatReport();
        sendReport();
        closeConnection();
    }

    protected void openConnection() { /* shared */ }
    protected void fetchData() { /* shared */ }
    protected abstract void formatReport();
    protected void sendReport() { /* shared */ }
    protected void closeConnection() { /* shared */ }
}

public class PdfReport extends ReportGenerator {
    protected void formatReport() {
        System.out.println("Formatting as PDF");
    }
}`,
    quiz: [
      {
        question: 'Template Method uses…',
        options: [
          'Composition to swap algorithms at runtime',
          'Inheritance to fix algorithm structure and vary specific steps',
          'A mediator to coordinate colleague objects',
          'Mementos to snapshot state for undo',
        ],
        correctIndex: 1,
        explanation:
          'The base class defines the algorithm skeleton; subclasses override hook methods for customizable steps.',
      },
      {
        question: 'A fixed recipe with customizable ingredients maps to…',
        options: ['Visitor', 'Template Method', 'Memento', 'Flyweight'],
        correctIndex: 1,
        explanation:
          'The overall process stays the same; only certain steps vary — the hallmark of Template Method.',
      },
    ],
  },
  {
    slug: 'visitor',
    name: 'Visitor',
    category: 'behavioral',
    oneLiner: 'Add new operations to a stable object structure without changing the element classes.',
    analogy:
      'A building inspector visiting every room: the building layout (elements) stays the same, but different inspectors (visitors) check for fire safety, electrical code, or accessibility — each brings a new operation.',
    analogyIcon: '🔍',
    problem:
      'You have a stable hierarchy of element types (shapes, AST nodes, file entries) and need many unrelated operations (export, validate, pretty-print, compute area). Adding each operation means editing every element class or duplicating dispatch logic.',
    solution:
      'Declare a visitor interface with a visit method per concrete element type. Elements accept a visitor and call back visit(this). New operations are new visitor classes; element classes stay unchanged. Double dispatch picks the right visit overload.',
    whenToUse: [
      'Object structure is stable but operations on it change frequently',
      'Operations are unrelated and would clutter element classes',
      'You need to perform actions across a heterogeneous collection uniformly',
      'Examples: AST evaluators, document exporters, compiler passes',
    ],
    whenNotToUse: [
      'Element types change often — every new type breaks all visitors',
      'Only one simple operation exists',
      'Breaking encapsulation by exposing element internals to visitors is unacceptable',
    ],
    relatedPatterns: ['iterator', 'composite'],
    codeBefore: `// Visitor smell — every new operation edits every element
public interface Shape {
    double area();
    String toJson();    // export added later
    String toSvg();     // another export format
    // validate(), print()... class keeps growing
}

public class Circle implements Shape {
    private double radius;
    public double area() { return Math.PI * radius * radius; }
    public String toJson() { return "{\\"type\\":\\"circle\\"}"; }
}`,
    codeAfter: `// Visitor — new operations without changing elements
public interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Rectangle rectangle);
}

public interface Shape {
    void accept(ShapeVisitor visitor);
}

public class Circle implements Shape {
    private double radius;
    public void accept(ShapeVisitor visitor) { visitor.visit(this); }
}

public class AreaVisitor implements ShapeVisitor {
    private double total = 0;
    public void visit(Circle c) { total += Math.PI * c.getRadius() * c.getRadius(); }
    public void visit(Rectangle r) { total += r.getWidth() * r.getHeight(); }
}

// Add JsonExportVisitor later — no Shape edits needed`,
    quiz: [
      {
        question: 'Visitor lets you…',
        options: [
          'Add new operations to elements without modifying element classes',
          'Ensure only one instance of a visitor exists',
          'Chain handlers until one processes a request',
          'Swap internal state objects at runtime',
        ],
        correctIndex: 0,
        explanation:
          'New behavior lives in visitor classes; elements only expose accept(visitor) for double dispatch.',
      },
      {
        question: 'Visitor is a poor fit when…',
        options: [
          'The object structure rarely changes but operations vary often',
          'You frequently add new element types to the hierarchy',
          'You need to export the same structure to many formats',
          'Operations like validate and print would clutter element classes',
        ],
        correctIndex: 1,
        explanation:
          'Each new element type requires updating every visitor — the pattern assumes a stable structure.',
      },
    ],
  },
];
