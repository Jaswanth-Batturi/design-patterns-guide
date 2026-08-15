/**
 * One example thread per pattern — same story from analogy through code, run, and tradeoffs.
 */
export interface PatternStory {
  example: string;
  scene: [string, string, string];
  without: [string, string, string];
  with: [string, string, string];
  codeBridge: string;
  codeBeforeHint: string;
  codeAfterHint: string;
  tryItSteps: string[];
}

export const patternStories: Record<string, PatternStory> = {
  singleton: {
    example: 'Home Wi‑Fi network',
    scene: [
      'Every phone, laptop, and TV in your home joins one Wi‑Fi network name and password.',
      'If each room had its own router with different credentials, devices would connect to conflicting networks.',
      'One router → one SSID → every app reads the same shared settings.',
    ],
    without: [
      'new AppConfig() in every service → multiple config objects in memory.',
      'Production URL in one copy, staging in another — bugs only after deploy.',
      'Like five routers: no single source of truth for the app.',
    ],
    with: [
      'AppConfig.getInstance() always returns the same object.',
      'One place to load env vars and connection limits.',
      'Every service joins the same “network” (shared instance).',
    ],
    codeBridge: 'Same Wi‑Fi idea in code: one getInstance() door instead of scattered new AppConfig().',
    codeBeforeHint: 'Without Singleton — two AppConfig objects, like two routers with different passwords.',
    codeAfterHint: 'With Singleton — getInstance() twice returns the same object (same Wi‑Fi network).',
    tryItSteps: [
      'Wait for the Java editor to finish loading.',
      'Click Run ▶ — this demo uses the same Wi‑Fi / AppConfig example.',
      'Expect Theme is now: dark and Same object? true.',
    ],
  },
  factory: {
    example: 'Coffee shop order',
    scene: [
      'You tell the barista “latte” — you never open the recipe book or enter the kitchen.',
      'The barista picks the right recipe and makes the drink behind the counter.',
      'You get coffee without knowing which concrete class was instantiated.',
    ],
    without: [
      'exportReport() grows with if/else for PDF, Excel, CSV…',
      'New format → edit the same method again.',
      'Like every customer walking into the kitchen to cook.',
    ],
    with: [
      'Client asks creator.createExporter("pdf") at the counter.',
      'New format = new small exporter class, not another elseif.',
      'Order at the table; kitchen picks the recipe.',
    ],
    codeBridge: 'Factory Method = coffee order: createExporter() hides Pdf vs Excel construction.',
    codeBeforeHint: 'Without Factory — giant if/else at the counter (client picks every recipe step).',
    codeAfterHint: 'With Factory — say “latte”; creator returns the right drink class.',
    tryItSteps: [
      'Run ▶ — same coffee-shop export demo (PDF and Excel lines).',
      'Imagine “latte” = createExporter("pdf") behind the counter.',
    ],
  },
  'abstract-factory': {
    example: 'Matched furniture set',
    scene: [
      'You buy a Scandinavian furniture set — sofa, table, and lamp all match.',
      'You pick the style once; the whole room stays consistent.',
      'You never mix a Victorian chair with a modern glass table from different kits.',
    ],
    without: [
      'MacButton + WindowsCheckbox on the same screen — mismatched UI family.',
      'Each widget chosen alone breaks visual consistency.',
      'Like random furniture pieces from different stores.',
    ],
    with: [
      'MacUIFactory creates button + checkbox + dialog together.',
      'Swap factory → entire UI theme changes as one kit.',
      'One furniture set, not loose pieces.',
    ],
    codeBridge: 'Abstract Factory = furniture set: one factory builds a whole matching UI family.',
    codeBeforeHint: 'Without — Mac button + Win checkbox (mixed furniture styles).',
    codeAfterHint: 'With — one factory creates a matched button and checkbox set.',
    tryItSteps: [
      'Run ▶ — see [Mac] and [Win] UI kits printed as matched sets.',
    ],
  },
  builder: {
    example: 'Burrito counter',
    scene: [
      'You pick rice, beans, and protein step by step at the counter.',
      'The worker assembles layers; you don’t toss raw ingredients in a bag.',
      'You leave with one complete burrito, not a half-built mess.',
    ],
    without: [
      'new HttpRequest(host, path, headers, body, timeout…) — 12 constructor args.',
      'Easy to pass null in the wrong slot.',
      'Half-built objects floating in the codebase.',
    ],
    with: [
      'builder.rice().beans().protein().build() — only what you need.',
      'build() returns a valid burrito (object) or fails early.',
      'Counter assembles; you don’t cook at the table.',
    ],
    codeBridge: 'Builder = burrito line: fluent steps, then build() returns the finished object.',
    codeBeforeHint: 'Without — one giant constructor (everything in one bag, error-prone).',
    codeAfterHint: 'With — layer rice, beans, protein, then build().',
    tryItSteps: [
      'Run ▶ — prints the built burrito (bun + beef + cheese).',
    ],
  },
  prototype: {
    example: 'Duplicate Google Doc',
    scene: [
      'Duplicate a meeting-notes template instead of retyping every heading.',
      'Change the client name on the copy; the master template stays untouched.',
      'Fast, faithful copies without rebuilding layout from scratch.',
    ],
    without: [
      'Rebuild complex Form from DB rows every draft.',
      'Manual copy.name = …; copy.address = … — miss one field.',
      'Clone logic duplicated in three services.',
    ],
    with: [
      'Form copy = original.clone() in one step.',
      'Edit the copy; template unchanged.',
      'Photocopy for objects.',
    ],
    codeBridge: 'Prototype = Duplicate doc: clone() then edit the copy’s name field.',
    codeBeforeHint: 'Without — copy every field by hand from the template.',
    codeAfterHint: 'With — clone() duplicates Alice’s form; rename copy to Bob.',
    tryItSteps: [
      'Run ▶ — original Alice address, then Bob on the copy.',
    ],
  },
  adapter: {
    example: 'USB‑C → HDMI dongle',
    scene: [
      'Your laptop has USB‑C; the projector only has HDMI.',
      'A dongle converts the plug — neither laptop nor projector is redesigned.',
      'Your presentation runs; both devices stay as they are.',
    ],
    without: [
      'Legacy payNow(amount) but app expects charge(amount).',
      'Glue code copied into every caller.',
      'Swap vendor → rewrite dozens of classes.',
    ],
    with: [
      'StripeAdapter.charge() calls legacy.payNow() inside.',
      'Clients only speak PaymentGateway.',
      'Dongle translates shape once.',
    ],
    codeBridge: 'Adapter = USB‑C dongle: wrap legacy payNow() behind charge().',
    codeBeforeHint: 'Without — call legacy.payNow() directly (wrong plug shape).',
    codeAfterHint: 'With — adapter.charge() translates to payNow() internally.',
    tryItSteps: [
      'Run ▶ — Legacy paid 49.99 through the adapter.',
    ],
  },
  bridge: {
    example: 'TV remote + TV brand',
    scene: [
      'Your remote has Power and Volume — same buttons for any TV brand.',
      'Sony, Samsung, and LG decode signals differently inside the TV.',
      'Swap the TV; the remote layout stays familiar.',
    ],
    without: [
      'RedCircle, BlueCircle, RedSquare… subclass explosion.',
      'Color and shape locked in one inheritance tree.',
      'New color → new class per shape.',
    ],
    with: [
      'Remote holds a Device reference; on() delegates.',
      'Swap SonyTV vs SamsungTV at runtime.',
      'Remote (abstraction) + TV (implementation) vary separately.',
    ],
    codeBridge: 'Bridge = remote + TV: Remote.on() calls device.on() — brand differs inside.',
    codeBeforeHint: 'Without — RedCircle class ties color and shape together.',
    codeAfterHint: 'With — Circle holds RedColor or BlueColor implementation.',
    tryItSteps: [
      'Run ▶ — same Power press on Sony TV and Samsung TV.',
    ],
  },
  composite: {
    example: 'Project folder on laptop',
    scene: [
      'Your “Projects” folder holds PDFs and subfolders — same Delete action.',
      'Delete the folder once; every file inside goes with it.',
      'You don’t treat files and folders as totally different mental models.',
    ],
    without: [
      'if (node.isFolder()) … else … in every menu action.',
      'New node type → update every traversal.',
      'Files vs folders need different APIs.',
    ],
    with: [
      'File and Folder both implement show() / delete().',
      'Folder.delete() recurses into children.',
      'One call on the project folder root.',
    ],
    codeBridge: 'Composite = project folder: root.delete() works on files and subfolders alike.',
    codeBeforeHint: 'Without — separate deleteFile() and deleteFolder() branches.',
    codeAfterHint: 'With — root.delete() on the project folder tree.',
    tryItSteps: [
      'Run ▶ — project folder and readme printed in one tree walk.',
    ],
  },
  decorator: {
    example: 'Insurance plan addons',
    scene: [
      'Start with base health insurance, then add dental, then vision.',
      'Each addon wraps the plan — you still have “one policy”.',
      'No class named BaseWithDentalAndVisionInsurance.',
    ],
    without: [
      'Subclass per combo: BufferedFile, EncryptedBufferedFile…',
      'Can’t toggle encryption at runtime.',
      'Feature matrix explodes.',
    ],
    with: [
      'new Encrypt(new Buffer(stream)) — stack at runtime.',
      'Each decorator shares the same interface.',
      'One addon per wrapper class.',
    ],
    codeBridge: 'Decorator = insurance addons: each wrapper adds behavior around inner.read().',
    codeBeforeHint: 'Without — subclass every combination of stream features.',
    codeAfterHint: 'With — plain stream wrapped with Upper then Exclaim decorators.',
    tryItSteps: [
      'Run ▶ — hello becomes HELLO! through stacked decorators.',
    ],
  },
  facade: {
    example: 'Food app “Order food”',
    scene: [
      'You tap Order food — one button on the app.',
      'Behind it: kitchen prepares meal, payment runs, delivery is booked.',
      'You don’t call three services yourself.',
    ],
    without: [
      'Checkout imports Inventory, Payment, Email, SMS directly.',
      'Subsystem APIs leak into UI.',
      'Change delivery provider → touch every screen.',
    ],
    with: [
      'OrderFacade.placeOrder() coordinates subsystems.',
      'UI depends on one friendly method.',
      'Same as one Order food tap.',
    ],
    codeBridge: 'Facade = Order food button: bookWeekend() calls reserve → charge → email inside.',
    codeBeforeHint: 'Without — UI calls inventory, payment, email separately.',
    codeAfterHint: 'With — hotel.bookWeekend() one tap, three subsystems inside.',
    tryItSteps: [
      'Run ▶ — Room reserved, Payment taken, Confirmation emailed (one facade call).',
    ],
  },
  flyweight: {
    example: 'Letter “e” in Word',
    scene: [
      'A document uses “e” thousands of times but stores one glyph drawing.',
      'Each position only stores x/y — the font shape is shared.',
      'Millions of characters without millions of duplicate bitmaps.',
    ],
    without: [
      'Every Character object stores full glyph texture.',
      '10,000 game trees each hold duplicate mesh data.',
      'GC churn from copied immutable data.',
    ],
    with: [
      'GlyphFactory.get("A") returns the same Glyph instance.',
      'Position stored per character; shape shared.',
      'Same “e” drawing reused everywhere.',
    ],
    codeBridge: 'Flyweight = shared “e” glyph: factory.get("A") returns one object for every A.',
    codeBeforeHint: 'Without — new Glyph("A") per character position.',
    codeAfterHint: 'With — two characters share factory.get("A"); Shared glyph? true.',
    tryItSteps: [
      'Run ▶ — Shared glyph? true for two positions using same A.',
    ],
  },
  proxy: {
    example: 'Netflix thumbnail → Play',
    scene: [
      'Netflix shows a thumbnail instantly when you browse.',
      'Full HD loads only when you press Play.',
      'You still interact with “the movie” — loading is hidden.',
    ],
    without: [
      'Product page downloads 4 MB images on every scroll.',
      'Auth checks copy-pasted before every sensitive call.',
      'Remote service details leak into UI.',
    ],
    with: [
      'ImageProxy.display() lazy-loads on first view.',
      'Same interface as the real image.',
      'Thumbnail stands in until Play.',
    ],
    codeBridge: 'Proxy = Netflix thumbnail: display() loads HD image only on first call.',
    codeBeforeHint: 'Without — loadFullImage() on every page load.',
    codeAfterHint: 'With — proxy shows Loading HD image then Showing image on demand.',
    tryItSteps: [
      'Run ▶ — Loading HD image then Showing image (lazy proxy).',
    ],
  },
  'chain-of-responsibility': {
    example: 'Support ticket escalation',
    scene: [
      'You email support; L1 tries, then billing, then engineering if needed.',
      'You don’t pick the agent — the ticket walks the chain.',
      'Each handler solves it or forwards along the chain.',
    ],
    without: [
      'Dispatcher with giant if/else on ticket type and priority.',
      'New tier → edit central router.',
      'Sender knows every handler class.',
    ],
    with: [
      'Handlers linked: handle() or forward to next.',
      'Build chain at runtime.',
      'Client submits to first link only.',
    ],
    codeBridge: 'Chain = support tiers: handle() fixes or passes to next link.',
    codeBeforeHint: 'Without — if (priority <= 1) L1 else if … in one method.',
    codeAfterHint: 'With — chain.handle(priority, issue) walks L1 → Engineering.',
    tryItSteps: [
      'Run ▶ — L1 fixed and Engineering fixed lines for different tickets.',
    ],
  },
  command: {
    example: 'Restaurant order ticket',
    scene: [
      'Waiter writes your order on a ticket — kitchen queues it.',
      'Void or replay the ticket later; undo pulls last ticket from stack.',
      'Button isn’t wired directly to the frying pan.',
    ],
    without: [
      'Toolbar calls editor.toggleBold() with no undo.',
      'No macro replay or audit log.',
      'UI coupled to editor internals.',
    ],
    with: [
      'BoldCommand encapsulates the action.',
      'Stack push/pop for undo.',
      'Same button runs different commands.',
    ],
    codeBridge: 'Command = order ticket: execute() runs, undo() reverses.',
    codeBeforeHint: 'Without — Bold button calls toggleBold() directly (no ticket).',
    codeAfterHint: 'With — command.execute() then undo() restores bold state.',
    tryItSteps: [
      'Run ▶ — Bold true then false after undo.',
    ],
  },
  interpreter: {
    example: 'Google Calendar grammar',
    scene: [
      'Calendar understands “every Monday at 9am” via a mini grammar.',
      'You don’t hand-write Java for each schedule phrase.',
      'New phrase = new small rule class.',
    ],
    without: [
      'Permission checks as nested string if/else.',
      'Add AND operator → another branch.',
      'Rules hard to unit-test.',
    ],
    with: [
      'Each rule is Expression.interpret(context).',
      'Compose And(RoleAdmin(), RoleEditor()).',
      'Grammar tree evaluates cleanly.',
    ],
    codeBridge: 'Interpreter = calendar grammar: And(admin, editor).interpret(user).',
    codeBeforeHint: 'Without — parse rule strings with if (contains "AND"))…',
    codeAfterHint: 'With — rule.interpret(user): admin passes, guest fails.',
    tryItSteps: [
      'Run ▶ — admin passes true, guest false.',
    ],
  },
  iterator: {
    example: 'Music app Next button',
    scene: [
      'Next/Previous works the same for playlists, albums, or streaming queues.',
      'You don’t peek at array vs linked list storage.',
      'Traversal is uniform — storage stays hidden.',
    ],
    without: [
      'Client loops with get(i) on raw ArrayList.',
      'Swap to LinkedList → break callers.',
      'Traversal logic duplicated in exports.',
    ],
    with: [
      'Iterator hasNext() / next() regardless of backing store.',
      'Multiple iterators per collection.',
      'Same Next button for any playlist implementation.',
    ],
    codeBridge: 'Iterator = Next button: walk songs without knowing internal list type.',
    codeBeforeHint: 'Without — for (i=0; i<arr.length) tied to array indices.',
    codeAfterHint: 'With — while (it.hasNext()) plays Intro, Verse, Chorus.',
    tryItSteps: [
      'Run ▶ — Now playing: Intro, Verse, Chorus.',
    ],
  },
  mediator: {
    example: 'Air traffic control',
    scene: [
      'Pilots radio the tower — not every other plane directly.',
      'Tower coordinates landings; planes don’t mesh-call each other.',
      'Add a runway rule in one place: the tower.',
    ],
    without: [
      'Chat widgets hold references to each other.',
      'New widget → wire to every existing widget.',
      'Components not reusable on other screens.',
    ],
    with: [
      'Mediator routes messages between colleagues.',
      'Widgets only know the mediator.',
      'Tower coordinates traffic.',
    ],
    codeBridge: 'Mediator = control tower: Alice sends to chat room; room forwards to Bob.',
    codeBeforeHint: 'Without — User widgets call each other directly.',
    codeAfterHint: 'With — Alice -> Bob: Meeting through ChatRoom mediator.',
    tryItSteps: [
      'Run ▶ — Alice -> Bob: Meeting through the room mediator.',
    ],
  },
  memento: {
    example: 'Game checkpoint',
    scene: [
      'Save checkpoint before the boss fight.',
      'Die → reload that save; game restores without exposing internals.',
      'Undo in docs = restore snapshot, not hand-edit every field.',
    ],
    without: [
      'Editor exposes all fields for UI to copy for undo.',
      'Caretaker mutates live document state.',
      'Undo logic scattered in toolbar handlers.',
    ],
    with: [
      'Originator creates opaque Memento snapshots.',
      'Caretaker stores history; originator restores.',
      'Clean undo stack like a save file.',
    ],
    codeBridge: 'Memento = checkpoint: save() snapshot, restore() rewinds text.',
    codeBeforeHint: 'Without — backup = editor.text (public field copy).',
    codeAfterHint: 'With — hello world then hello after undo restore.',
    tryItSteps: [
      'Run ▶ — hello world then hello after undo.',
    ],
  },
  observer: {
    example: 'Stock price alerts',
    scene: [
      'You subscribe to AAPL price alerts on your phone and email.',
      'When the stock moves, both channels notify you — no polling the market.',
      'Add SMS alerts by subscribing; the ticker class stays unchanged.',
    ],
    without: [
      'StockTicker.setPrice() calls phone, email, analytics directly.',
      'New alert channel → edit StockTicker again.',
      'Can’t test alerts without the whole ticker.',
    ],
    with: [
      'Ticker notifies subscribed observers on price change.',
      'New listener = subscribe(), no ticker edit.',
      'Same pattern as price alerts in real apps.',
    ],
    codeBridge: 'Observer = stock alerts: setPrice() loops observers instead of hard-coded channels.',
    codeBeforeHint: 'Without — setPrice() hard-codes phone and email inside.',
    codeAfterHint: 'With — subscribe phone and email; setPrice() notifies all.',
    tryItSteps: [
      'Run ▶ — Phone alert and Email alert when AAPL price updates.',
    ],
  },
  state: {
    example: 'Vending machine',
    scene: [
      'Insert coin → select item → dispense — rules depend on current mode.',
      'Same buttons behave differently when “out of stock” vs “ready”.',
      'Behavior lives in the state, not one giant switch.',
    ],
    without: [
      'if (status == PAID) ship() … giant enum chains on Order.',
      'New status → edit every transition.',
      'Invalid jumps (ship before pay) slip through.',
    ],
    with: [
      'PaidState and ShippedState implement pay() / ship().',
      'Context delegates to current state object.',
      'Vending machine mode owns its rules.',
    ],
    codeBridge: 'State = vending machine: context.pay() behavior depends on current state object.',
    codeBeforeHint: 'Without — if (PAID) ship() else if (NEW) pay() on one class.',
    codeAfterHint: 'With — pay() then ship() transitions Paid → Shipped states.',
    tryItSteps: [
      'Run ▶ — Paid then Shipped lines from the order workflow.',
    ],
  },
  strategy: {
    example: 'Checkout payment picker',
    scene: [
      'At checkout you pick Card, UPI, or Cash — same Pay button.',
      'Swap payment method without rewriting the cart page.',
      'New provider = new strategy class, not another elseif.',
    ],
    without: [
      'if (card) … else if (upi) … inside Checkout.pay().',
      'Add PayPal → modify pay() again.',
      'Algorithms stuck in one method.',
    ],
    with: [
      'Checkout holds PaymentStrategy reference.',
      'pay() delegates to strategy.process().',
      'Same Pay button, different strategy.',
    ],
    codeBridge: 'Strategy = checkout picker: pay() delegates to Card vs UPI strategy.',
    codeBeforeHint: 'Without — if/else payment type inside checkout.',
    codeAfterHint: 'With — Card paid and UPI paid via swapped strategies.',
    tryItSteps: [
      'Run ▶ — Card paid and UPI paid from same checkout.',
    ],
  },
  'template-method': {
    example: 'Tea and coffee recipe',
    scene: [
      'Both drinks: heat water → brew → pour into cup.',
      'Only the brew step differs (steep vs drip).',
      'You never duplicate “heat water” in two places.',
    ],
    without: [
      'Tea.prepare() and Coffee.prepare() duplicate heat/pour.',
      'Fix step order bug in two classes.',
      'Easy to skip a required step in one drink.',
    ],
    with: [
      'Beverage.prepare() defines heat → brew → pour.',
      'Tea and Coffee override brew() only.',
      'Recipe skeleton in one base class.',
    ],
    codeBridge: 'Template Method = drink recipe: prepare() calls heat → brew() → pour.',
    codeBeforeHint: 'Without — duplicate heat/brew/pour in Tea and Coffee.',
    codeAfterHint: 'With — shared prepare(); Coffee overrides brew() to drip.',
    tryItSteps: [
      'Run ▶ — Heating water, Steeping, Dripping coffee.',
    ],
  },
  visitor: {
    example: 'Tax auditor visiting departments',
    scene: [
      'Auditor visits HR, Engineering, and Sales — same visitor, different form per dept.',
      'New audit rule = new visitor class, not edit every department.',
      'Departments stay focused; audits are external operations.',
    ],
    without: [
      'exportPdf() on Circle, Square, Triangle… every node class.',
      'New report → edit all node classes.',
      'Domain objects bloated with algorithms.',
    ],
    with: [
      'node.accept(visitor) double-dispatch.',
      'TaxVisitor and ExportVisitor separate.',
      'Auditor walks the org chart.',
    ],
    codeBridge: 'Visitor = tax auditor: accept(visitor) calls visitCircle or visitSquare.',
    codeBeforeHint: 'Without — exportPdf() duplicated on every shape class.',
    codeAfterHint: 'With — accept(areaVisitor) prints Circle area and Square area.',
    tryItSteps: [
      'Run ▶ — Circle area and Square area from one visitor walk.',
    ],
  },
};
