/**
 * One connected story per pattern: scene → tradeoff → code → run share the same metaphor.
 * Analogies are chosen for developers: daily-life hook + clear code mapping.
 */
export interface PatternStory {
  scene: [string, string, string];
  without: [string, string, string];
  with: [string, string, string];
  codeBridge: string;
  runExpect: string;
}

export const patternStories: Record<string, PatternStory> = {
  singleton: {
    scene: [
      'One Wi‑Fi router in your home — every phone and laptop joins the same network.',
      'If each room had its own router with a different password, devices would disagree on “the” network.',
      'One router, one SSID — every app reads the same shared settings.',
    ],
    without: [
      'new AppConfig() sprinkled everywhere → multiple config objects in memory.',
      'Prod URL in one copy, staging in another — bugs only in production.',
      'Like five routers — no single source of truth for the app.',
    ],
    with: [
      'getInstance() always returns the same object.',
      'One place to load env vars, connection limits, feature flags.',
      'Every service reads the same shared instance.',
    ],
    codeBridge: 'Scattered `new AppConfig()` = many routers. Singleton = one `getInstance()` everyone uses.',
    runExpect: 'Same object? true',
  },
  factory: {
    scene: [
      'You tell the barista “latte” — you never open the recipe book yourself.',
      'The barista picks the right recipe and makes the drink.',
      'You get coffee without knowing which concrete class was instantiated.',
    ],
    without: [
      'exportReport() is a giant if/else: PDF, Excel, CSV…',
      'Adding a format means editing the same method again.',
      'Client code imports every concrete exporter class.',
    ],
    with: [
      'Client calls createExporter("pdf") on a factory.',
      'New format = new small class, not another elseif.',
      'Creation logic lives in one place per family.',
    ],
    codeBridge: 'Factory Method = order at the counter: factory.create() picks PdfExporter vs ExcelExporter.',
    runExpect: 'PDF and Excel export lines',
  },
  'abstract-factory': {
    scene: [
      'You buy a matched furniture set — sofa, table, and lamp all share one style.',
      'You pick “Scandinavian” or “Industrial” once; the whole room matches.',
      'You never mix a Victorian chair with a modern glass table from different kits.',
    ],
    without: [
      'UI picks MacButton and WindowsCheckbox in the same screen.',
      'Widgets chosen one-by-one → mismatched look and behavior.',
      'Swapping theme means editing every widget reference.',
    ],
    with: [
      'MacUIFactory creates button + checkbox + dialog together.',
      'Swap factory → entire UI family changes.',
      'Families stay consistent without cross-style glue code.',
    ],
    codeBridge: 'Abstract Factory = furniture set: one factory call builds a whole matching UI kit.',
    runExpect: '[Mac] and [Win] UI lines',
  },
  builder: {
    scene: [
      'At a burrito counter you pick rice, beans, protein, salsa — step by step.',
      'The worker assembles layers; you don’t toss raw ingredients in a bag.',
      'You walk away with one complete burrito, not a half-built mess.',
    ],
    without: [
      'new HttpRequest(host, path, headers, body, timeout, retries, …) — 12 args.',
      'Easy to pass null in the wrong slot or forget a required field.',
      'Half-configured objects floating through the codebase.',
    ],
    with: [
      'request.setHost().addHeader().withBody().build() — only what you need.',
      'Director can define “standard API call” presets.',
      'build() returns a valid object or fails early.',
    ],
    codeBridge: 'Builder = burrito line: fluent steps, then build() hands back a complete object.',
    runExpect: 'bun + beef + cheddar',
  },
  prototype: {
    scene: [
      'Duplicate a Google Doc template instead of retyping every heading and table.',
      'Change the client name on the copy; the original template stays untouched.',
      'Fast, faithful copies without rebuilding layout from scratch.',
    ],
    without: [
      'Rebuild a heavy object from DB rows every time you need a draft.',
      'Manual field-by-field copy — easy to miss one property.',
      'Clone logic duplicated in three services.',
    ],
    with: [
      'prototype.copy() duplicates everything in one call.',
      'Customize the clone; original remains the master template.',
      'Hide internal structure from clients who only need a duplicate.',
    ],
    codeBridge: 'Prototype = “Duplicate document”: clone() copies, then you edit the copy.',
    runExpect: 'Alice and Bob addresses',
  },
  adapter: {
    scene: [
      'Your laptop has USB‑C; the conference room projector only has HDMI.',
      'A small dongle converts the plug shape — neither device is redesigned.',
      'Your presentation runs; the projector and laptop stay as they are.',
    ],
    without: [
      'Legacy API exposes payNow(amount); your app expects charge(amount).',
      'Every caller copies conversion glue code.',
      'Swap payment vendor → rewrite dozens of classes.',
    ],
    with: [
      'StripeAdapter implements your PaymentGateway interface.',
      'One class translates charge() → payNow().',
      'Clients only speak the interface they already know.',
    ],
    codeBridge: 'Adapter = USB‑C to HDMI dongle: wraps legacy API behind the interface you expect.',
    runExpect: 'Legacy paid 49.99',
  },
  bridge: {
    scene: [
      'A TV remote has Power and Volume buttons — the same layout for every brand.',
      'Sony, Samsung, and LG each decode signals differently inside the TV.',
      'Swap the TV brand; the remote buttons stay familiar.',
    ],
    without: [
      'RedCircle, BlueCircle, RedSquare… — subclass explosion.',
      'Color and shape locked together in one inheritance tree.',
      'Add a new color → write new classes for every shape.',
    ],
    with: [
      'Remote (abstraction) holds a Device reference.',
      'on() delegates to SonyTV or SamsungTV at runtime.',
      'Two dimensions evolve independently.',
    ],
    codeBridge: 'Bridge = remote + TV: abstraction calls device.on(); brand logic stays in implementation.',
    runExpect: 'Sony TV on and Samsung TV on',
  },
  composite: {
    scene: [
      'A folder on your laptop holds PDFs and subfolders — same “delete” for both.',
      'Delete the project folder once; every file inside goes with it.',
      'You treat a single file and a whole tree with one mental model.',
    ],
    without: [
      'if (node.isFolder()) … else … in every menu action.',
      'New node type → update every traversal and UI handler.',
      'Leaves and containers need different APIs.',
    ],
    with: [
      'File and Folder both implement Component.show().',
      'Folder.show() calls show() on each child.',
      'Client calls root.show() — no type branching.',
    ],
    codeBridge: 'Composite = folder tree: one interface for files and folders; folders recurse.',
    runExpect: 'project folder and readme',
  },
  decorator: {
    scene: [
      'You order base insurance, then add dental, then add vision — each wraps the plan.',
      'Each addon wraps the previous package; you still have “one insurance policy”.',
      'No need for a class named BaseWithDentalAndVisionInsurance.',
    ],
    without: [
      'Subclass per combo: BufferedFile, EncryptedBufferedFile…',
      'Can’t turn encryption on/off at runtime.',
      'Feature matrix explodes with every new option.',
    ],
    with: [
      'new Encrypt(new Buffer(stream)) — stack at runtime.',
      'Each decorator implements the same interface.',
      'Add a new feature = one new wrapper class.',
    ],
    codeBridge: 'Decorator = insurance addons: each wrapper adds behavior around inner.read().',
    runExpect: 'hello and HELLO!',
  },
  facade: {
    scene: [
      'You tap “Order food” in an app — one button behind the scenes calls kitchen, payment, and delivery.',
      'You don’t call three APIs yourself or know which service failed.',
      'One simple screen action replaces a fragile orchestration script.',
    ],
    without: [
      'Checkout page imports Inventory, Payment, Email, SMS directly.',
      'Subsystem APIs leak into UI components.',
      'Change delivery provider → touch every screen.',
    ],
    with: [
      'OrderFacade.placeOrder() coordinates subsystems internally.',
      'UI depends on one friendly method.',
      'Subsystem swaps stay behind the facade.',
    ],
    codeBridge: 'Facade = “Order food” button: one method hides reserve → charge → notify.',
    runExpect: 'Room reserved, Payment, Confirmation',
  },
  flyweight: {
    scene: [
      'A Word document uses the letter “e” thousands of times but stores one glyph drawing.',
      'Each position only stores x/y — the heavy font shape is shared.',
      'Millions of characters without millions of duplicate font bitmaps.',
    ],
    without: [
      'Every Character object stores full font metrics and texture.',
      'Game spawns 10,000 trees with duplicate mesh data in RAM.',
      'GC churn from identical immutable data copied everywhere.',
    ],
    with: [
      'GlyphFactory returns the same Glyph instance for each “A”.',
      'Extrinsic state (position) stored per character only.',
      'Intrinsic state (shape) shared across the document.',
    ],
    codeBridge: 'Flyweight = shared glyph: factory.get("A") returns one object used everywhere.',
    runExpect: 'Shared glyph? true',
  },
  proxy: {
    scene: [
      'Netflix shows a thumbnail instantly; the full HD movie loads only when you press Play.',
      'The thumbnail stands in for the heavy file until you really need it.',
      'You still feel like you’re “watching the movie” — loading is hidden.',
    ],
    without: [
      'Product page downloads 4 MB images on every scroll event.',
      'Authorization checks copy-pasted before every sensitive call.',
      'Remote service details leak into UI code.',
    ],
    with: [
      'ImageProxy.display() lazy-loads the real file on first view.',
      'SecurityProxy checks permissions once, centrally.',
      'Client talks to proxy with the same interface as the real object.',
    ],
    codeBridge: 'Proxy = Netflix thumbnail: same display() call; heavy work deferred inside proxy.',
    runExpect: 'Loading HD image then Showing image',
  },
  'chain-of-responsibility': {
    scene: [
      'You email support; L1 tries, then forwards to billing, then to engineering if needed.',
      'You don’t pick the agent — the ticket walks the chain until someone can fix it.',
      'Each handler either solves it or passes it along.',
    ],
    without: [
      'Dispatcher method with giant if/else on ticket type and priority.',
      'Add a new tier → edit the central router again.',
      'Sender knows every handler class in the system.',
    ],
    with: [
      'Handlers linked: handle() or forward to next.',
      'Build or reorder chain at runtime.',
      'Client submits to first link only.',
    ],
    codeBridge: 'Chain = support tiers: handle() fixes or calls next — like servlet filters.',
    runExpect: 'L1 fixed and Engineering fixed',
  },
  command: {
    scene: [
      'A waiter writes your order on a ticket — the kitchen queues it, you can void or replay it.',
      'The ticket is the command object; the button isn’t wired directly to the frying pan.',
      'Undo = pull the last ticket from the stack.',
    ],
    without: [
      'Toolbar button calls editor.toggleBold() directly.',
      'No undo stack, no macro replay, no audit log.',
      'UI tightly coupled to editor internals.',
    ],
    with: [
      'BoldCommand encapsulates the action.',
      'Invoker pushes commands; undo pops and reverses.',
      'Same button can run different commands.',
    ],
    codeBridge: 'Command = order ticket: execute() runs, undo() reverses, queue for later.',
    runExpect: 'Bold true then false after undo',
  },
  interpreter: {
    scene: [
      'Google Calendar understands “every Monday at 9am” — symbols follow a mini grammar.',
      'You don’t hand-write Java code for each schedule phrase.',
      'New phrase = new small rule class in the grammar.',
    ],
    without: [
      'Permission checks as nested string parsing and if/else.',
      'Add AND/OR operator → another branch in one function.',
      'Rules impossible to unit-test in isolation.',
    ],
    with: [
      'Each rule is an Expression with interpret(context).',
      'Compose: And(RoleAdmin(), RoleEditor()).',
      'Grammar tree evaluates user input cleanly.',
    ],
    codeBridge: 'Interpreter = calendar grammar: expression tree evaluates “admin AND editor”.',
    runExpect: 'admin passes true, guest false',
  },
  iterator: {
    scene: [
      'Music app Next/Previous works the same for playlists, albums, or streaming queues.',
      'You don’t peek at whether songs live in an array or a linked list.',
      'Traversal is uniform — storage stays hidden.',
    ],
    without: [
      'Client loops with get(i) on a raw ArrayList.',
      'Swap to LinkedList → break every caller.',
      'Same traversal logic copy-pasted in reports and exports.',
    ],
    with: [
      'Iterator hasNext() / next() regardless of backing store.',
      'Multiple iterators can walk the same collection.',
      'for-each and streams share one traversal contract.',
    ],
    codeBridge: 'Iterator = Next button: walk items without knowing internal list structure.',
    runExpect: 'Now playing: Intro, Verse, Chorus',
  },
  mediator: {
    scene: [
      'Pilots radio the air-traffic tower — not every other plane directly.',
      'Tower coordinates who lands when; planes don’t maintain a mesh of calls.',
      'Add a new runway rule in one place: the tower.',
    ],
    without: [
      'Chat UI components hold references to each other.',
      'New widget → wire it to every existing widget.',
      'Reuse a component on another screen = rewrite all links.',
    ],
    with: [
      'Mediator routes messages between colleagues.',
      'Widgets only know the mediator interface.',
      'Interaction rules live in one coordinator.',
    ],
    codeBridge: 'Mediator = control tower: users send to chat room; room forwards to recipient.',
    runExpect: 'Alice -> Bob: Meeting',
  },
  memento: {
    scene: [
      'Video game checkpoint before the boss — die and you reload that save.',
      'The save file holds state; the game restores without exposing internals.',
      'Undo in docs = restore snapshot, not hand-edit every field.',
    ],
    without: [
      'Editor exposes all fields so UI can copy them for undo.',
      'Caretaker accidentally mutates live document state.',
      'Undo logic scattered across toolbar handlers.',
    ],
    with: [
      'Originator creates opaque Memento snapshots.',
      'Caretaker stores history; originator restores when asked.',
      'Clean undo/redo stack with encapsulation preserved.',
    ],
    codeBridge: 'Memento = save point: snapshot state, restore() rewinds without public fields.',
    runExpect: 'hello world then hello after undo',
  },
  observer: {
    scene: [
      'You subscribe to a stock price alert — when price moves, you get notified automatically.',
      'You don’t poll the market every second; the feed pushes updates to subscribers.',
      'Add SMS alerts by subscribing — the stock ticker class stays unchanged.',
    ],
    without: [
      'Order.setStatus() directly calls email, SMS, analytics, webhook…',
      'New channel → edit Order again and risk breaking checkout.',
      'Can’t test listeners without constructing the whole order.',
    ],
    with: [
      'Subject notifies registered observers on change.',
      'New listener = subscribe(), no change to subject.',
      'Open/closed: extend behavior without modifying core class.',
    ],
    codeBridge: 'Observer = price alert: setStatus() notifies listeners instead of hard-coded services.',
    runExpect: 'Email and SMS shipped lines',
  },
  state: {
    scene: [
      'A vending machine: insert coin → select item → dispense — rules depend on current mode.',
      'Same buttons do different things when “out of stock” vs “ready”.',
      'Behavior lives in the state, not one giant switch on a string.',
    ],
    without: [
      'if (status == PAID) … else if (SHIPPED) … across the order class.',
      'New status → edit every transition method.',
      'Invalid jumps (ship before pay) slip through.',
    ],
    with: [
      'PaidState and ShippedState each implement pay() / ship().',
      'Context delegates to current state object.',
      'Transitions encoded in state classes, not enums everywhere.',
    ],
    codeBridge: 'State = vending machine mode: context calls state.pay(); rules live in state class.',
    runExpect: 'Paid then Shipped',
  },
  strategy: {
    scene: [
      'At checkout you pick Card, UPI, or Cash — same Pay button, different processing behind it.',
      'Swap payment method without rewriting the cart page.',
      'New provider = new strategy class, not another elseif.',
    ],
    without: [
      'if (card) … else if (upi) … inside Checkout.pay().',
      'Add PayPal → modify pay() again.',
      'Pricing rules mixed with UI event handlers.',
    ],
    with: [
      'Checkout holds a PaymentStrategy reference.',
      'pay() delegates to strategy.process().',
      'Swap strategy at runtime or via config.',
    ],
    codeBridge: 'Strategy = payment picker: checkout.pay() delegates to card vs UPI strategy.',
    runExpect: 'Card paid and UPI paid',
  },
  'template-method': {
    scene: [
      'Making tea and coffee: both heat water and pour — only the brew step differs.',
      'Same recipe skeleton; subclasses fill in steep vs drip.',
      'You never duplicate “heat water” in two places.',
    ],
    without: [
      'Tea.prepare() and Coffee.prepare() duplicate heat/pour logic.',
      'Fix a step order bug in two classes.',
      'Easy to skip a required step in one drink.',
    ],
    with: [
      'Beverage.prepare() defines heat → brew → pour sequence.',
      'Tea and Coffee override brew() only.',
      'Algorithm structure fixed in one base class.',
    ],
    codeBridge: 'Template Method = drink recipe: prepare() calls steps; subclasses override brew().',
    runExpect: 'Heating water, Steeping, Dripping coffee',
  },
  visitor: {
    scene: [
      'A tax auditor visits HR, Engineering, and Sales — same visitor, different form per department.',
      'Add a new audit rule = new visitor class, not edit every department.',
      'Departments stay focused on their job; audits are external operations.',
    ],
    without: [
      'exportPdf() added to Circle, Square, Triangle classes…',
      'New report type → touch every node class.',
      'Domain objects bloated with unrelated algorithms.',
    ],
    with: [
      'node.accept(visitor) double-dispatch.',
      'TaxVisitor and ExportVisitor live separately.',
      'New operation = new visitor, stable node classes.',
    ],
    codeBridge: 'Visitor = tax auditor: accept(visitor) calls visitCircle or visitSquare.',
    runExpect: 'Circle area and Square area',
  },
};
