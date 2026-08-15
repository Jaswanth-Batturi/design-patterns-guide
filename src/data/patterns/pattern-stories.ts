/**
 * One connected story per pattern: scene → tradeoff → code → run use the same metaphor.
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
      'One electric meter for the whole apartment.',
      'Two meters → two readings. Which bill is correct?',
      'One meter → every room shares the same number.',
    ],
    without: [
      'new AppConfig() anywhere → multiple config objects.',
      'Settings drift: prod URL in one place, staging in another.',
      'Same as two meters — no single source of truth.',
    ],
    with: [
      'getInstance() → always the same object.',
      'One load path for shared settings.',
      'One meter for the whole app.',
    ],
    codeBridge: '“Two meters” in code = scattered new AppConfig(). Singleton = one getInstance() door.',
    runExpect: 'Same object? true',
  },
  factory: {
    scene: [
      'You order “burger” at a restaurant.',
      'Kitchen picks recipe — you stay at the table.',
      'Waiter brings food without you cooking.',
    ],
    without: [
      'if (pdf) … else if (excel) … in the client.',
      'New export format → edit the same method again.',
      'Like forcing diners into the kitchen.',
    ],
    with: [
      'Client asks a creator; creator picks the class.',
      'New format = new small class.',
      'Order at the table, kitchen builds it.',
    ],
    codeBridge: 'Kitchen = Factory Method: createExporter() hides which concrete class gets built.',
    runExpect: 'PDF and Excel export lines',
  },
  'abstract-factory': {
    scene: [
      'Pick Modern or Victorian furniture set.',
      'Chair, sofa, table all match the style.',
      'Swap the whole room — never mix styles.',
    ],
    without: [
      'Mac button + Windows checkbox in one UI.',
      'Each widget chosen alone → mismatched families.',
      'Like a Victorian chair on a Modern sofa.',
    ],
    with: [
      'One factory builds button + checkbox together.',
      'Swap factory → whole theme changes.',
      'Showroom kit, not random pieces.',
    ],
    codeBridge: 'Abstract Factory = pick MacFactory or WinFactory — full UI kit in one call.',
    runExpect: '[Mac] and [Win] UI lines',
  },
  builder: {
    scene: [
      'Custom sandwich: bread, patty, cheese step by step.',
      'Worker adds each layer at the counter.',
      'You get one complete sandwich, not raw ingredients.',
    ],
    without: [
      'Constructor with 12 parameters.',
      'Easy to pass nulls in wrong order.',
      'Half-built objects in the codebase.',
    ],
    with: [
      'builder.cheese("cheddar").build() — only what you need.',
      'Valid object before anyone uses it.',
      'Counter builds; you don’t assemble.',
    ],
    codeBridge: 'Builder = sandwich line: set steps, then build() returns the finished object.',
    runExpect: 'bun + beef + cheddar',
  },
  prototype: {
    scene: [
      'Photocopy a filled form instead of rewriting.',
      'Change only the name on the copy.',
      'Original stays unchanged.',
    ],
    without: [
      'Rebuild complex object from scratch each time.',
      'Manual copy field-by-field.',
      'Miss one field → wrong duplicate.',
    ],
    with: [
      'clone() copies everything in one step.',
      'Tweak the copy, original untouched.',
      'Photocopy for objects.',
    ],
    codeBridge: 'Prototype = photocopy: copy() duplicates, then edit the copy.',
    runExpect: 'Alice and Bob addresses',
  },
  adapter: {
    scene: [
      'EU plug doesn’t fit US outlet.',
      'Travel adapter changes the shape.',
      'Device works — hotel wiring unchanged.',
    ],
    without: [
      'Legacy payNow() vs your charge() API.',
      'Glue code copied into every caller.',
      'Swap vendor → rewrite many classes.',
    ],
    with: [
      'One adapter translates old → new.',
      'App only calls charge().',
      'Adapter = travel plug.',
    ],
    codeBridge: 'Adapter wraps legacy payNow() so clients only see charge().',
    runExpect: 'Legacy paid 49.99',
  },
  bridge: {
    scene: [
      'TV remote works with any TV brand.',
      'Same Power button, different internals.',
      'Swap TV — remote stays the same.',
    ],
    without: [
      'RedCircle, BlueCircle, RedSquare… subclass explosion.',
      'Color and shape locked together.',
      'New color → new class per shape.',
    ],
    with: [
      'Remote holds a Device reference.',
      'Swap Sony vs Samsung at runtime.',
      'Two dimensions vary independently.',
    ],
    codeBridge: 'Bridge = remote + device: abstraction calls device.on(), brand differs inside.',
    runExpect: 'Sony TV on and Samsung TV on',
  },
  composite: {
    scene: [
      'Folder holds files and subfolders.',
      'Delete folder → everything inside goes.',
      'Same “delete” for file or folder.',
    ],
    without: [
      'if (folder) else (file) everywhere.',
      'New node type breaks every walker.',
      'Files and groups handled differently.',
    ],
    with: [
      'File and Folder share show().',
      'Folder calls show() on children.',
      'One API for leaves and trees.',
    ],
    codeBridge: 'Composite = folder tree: root.show() prints files and subfolders alike.',
    runExpect: 'project folder and readme',
  },
  decorator: {
    scene: [
      'Coffee + milk + whipped cream layers.',
      'Each addon wraps the drink.',
      'No “CoffeeWithMilkAndCream” class.',
    ],
    without: [
      'Subclass per feature combo.',
      'Can’t mix features at runtime.',
      'BufferedEncryptedFile… explosion.',
    ],
    with: [
      'Wrap in decorators with same interface.',
      'Stack at runtime: Encrypt(Buffer(stream)).',
      'One feature per decorator class.',
    ],
    codeBridge: 'Decorator = coffee addons: each wrapper adds behavior around inner.read().',
    runExpect: 'hello and HELLO!',
  },
  facade: {
    scene: [
      'Hotel front desk: one call books room + spa + dinner.',
      'You don’t call housekeeping, chef, concierge.',
      'One simple request.',
    ],
    without: [
      'Client orchestrates 5 subsystems.',
      'Subsystem APIs leak into UI.',
      'Small workflow change → many screens break.',
    ],
    with: [
      'bookWeekend() hides internal steps.',
      'Subsystems change behind facade.',
      'Front desk API.',
    ],
    codeBridge: 'Facade = front desk: bookWeekend() calls reserve, charge, email inside.',
    runExpect: 'Room reserved, Payment, Confirmation',
  },
  flyweight: {
    scene: [
      'Letter “e” reused thousands of times in a doc.',
      'Store one glyph, many positions.',
      'Memory stays small.',
    ],
    without: [
      'Each character stores full glyph data.',
      'Millions of duplicate textures.',
      'GC pressure from copies.',
    ],
    with: [
      'Factory shares one Glyph per letter.',
      'Position stored per character only.',
      'Shared intrinsic state.',
    ],
    codeBridge: 'Flyweight = shared glyph: factory.get("A") returns same object for every A.',
    runExpect: 'Shared glyph? true',
  },
  proxy: {
    scene: [
      'Assistant screens calls before they reach you.',
      'Spam blocked; real clients pass.',
      'Caller still thinks they reached you.',
    ],
    without: [
      'Heavy image loads on every scroll.',
      'Access checks duplicated everywhere.',
      'Remote details leak into UI code.',
    ],
    with: [
      'Proxy lazy-loads real object.',
      'Security/logging in one place.',
      'Same interface as real subject.',
    ],
    codeBridge: 'Proxy = assistant: display() loads real image only on first call.',
    runExpect: 'Loading HD image then Showing image',
  },
  'chain-of-responsibility': {
    scene: [
      'Support ticket: L1 → L2 → engineering.',
      'Each tier tries or escalates.',
      'You don’t pick the agent.',
    ],
    without: [
      'Giant if/else for priority in dispatcher.',
      'New tier → edit central method.',
      'Sender knows every handler.',
    ],
    with: [
      'Handlers linked: try or forward.',
      'Build chain at runtime.',
      'Sender talks to first link only.',
    ],
    codeBridge: 'Chain = support tiers: handle() processes or passes to next.',
    runExpect: 'L1 fixed and Engineering fixed',
  },
  command: {
    scene: [
      'Waiter writes order ticket, not cooks.',
      'Kitchen queues tickets.',
      'Void or replay the ticket later.',
    ],
    without: [
      'Button calls editor.toggleBold() directly.',
      'No undo, no queue, no macro.',
      'UI coupled to business logic.',
    ],
    with: [
      'Action = Command object.',
      'Push on stack → undo pops.',
      'Same button, different commands.',
    ],
    codeBridge: 'Command = order ticket: execute() runs, undo() reverses.',
    runExpect: 'Bold true then false after undo',
  },
  interpreter: {
    scene: [
      'Sheet music: symbols follow grammar rules.',
      'Musician reads and plays.',
      'New symbol = new rule class.',
    ],
    without: [
      'String hacks for AND/OR rules.',
      'New operator → another if branch.',
      'Rules hard to test.',
    ],
    with: [
      'Each rule is an Expression class.',
      'Compose: And(roleAdmin, roleEditor).',
      'interpret(user) evaluates tree.',
    ],
    codeBridge: 'Interpreter = music grammar: expression tree evaluates the rule.',
    runExpect: 'admin passes true, guest false',
  },
  iterator: {
    scene: [
      'Playlist next/prev without seeing the array.',
      'Array or streaming — same buttons.',
      'Traverse without knowing storage.',
    ],
    without: [
      'Client uses get(i) on raw array.',
      'Swap storage → break callers.',
      'Traversal logic duplicated.',
    ],
    with: [
      'Iterator: hasNext() / next().',
      'Multiple iterators per collection.',
      'Uniform foreach walk.',
    ],
    codeBridge: 'Iterator = playlist buttons: walk items without touching internal list.',
    runExpect: 'Now playing: Intro, Verse, Chorus',
  },
  mediator: {
    scene: [
      'Pilots talk to air traffic control, not each other.',
      'Tower coordinates all paths.',
      'No plane-to-plane spaghetti.',
    ],
    without: [
      'UI widgets reference each other.',
      'New widget → wire to every other.',
      'Components not reusable.',
    ],
    with: [
      'Mediator routes messages.',
      'Widgets only know mediator.',
      'Tower controls traffic.',
    ],
    codeBridge: 'Mediator = tower: users send to chat room, room forwards to recipient.',
    runExpect: 'Alice -> Bob: Meeting',
  },
  memento: {
    scene: [
      'Game checkpoint before boss fight.',
      'Lose → reload checkpoint.',
      'Save holds state privately.',
    ],
    without: [
      'Public fields copied for undo.',
      'Caretaker corrupts state.',
      'Undo logic in UI scattered.',
    ],
    with: [
      'Originator creates opaque snapshot.',
      'Caretaker stores; originator restores.',
      'Clean undo stack.',
    ],
    codeBridge: 'Memento = save point: snapshot string, restore() rewinds text.',
    runExpect: 'hello world then hello after undo',
  },
  observer: {
    scene: [
      'Subscribe to a blog newsletter.',
      'Blog publishes a new post.',
      'Email arrives — no refreshing the site.',
    ],
    without: [
      'OrderStatus calls email, SMS, analytics inside setStatus().',
      'New channel → edit OrderStatus again.',
      'Can’t test listeners alone.',
    ],
    with: [
      'Subject notifies subscribed observers.',
      'New listener = subscribe(), no subject edit.',
      'Newsletter for code events.',
    ],
    codeBridge: 'Observer = newsletter: setStatus() loops observers instead of hard-coded services.',
    runExpect: 'Email and SMS shipped lines',
  },
  state: {
    scene: [
      'Traffic light: green → yellow → red.',
      'Same hardware, different rules per color.',
      'Behavior follows current state.',
    ],
    without: [
      'if (status == SHIPPED) … giant enum chains.',
      'New status → edit every transition.',
      'Invalid transitions slip in.',
    ],
    with: [
      'Each state class handles its transitions.',
      'Context delegates to current state.',
      'Light color owns its rules.',
    ],
    codeBridge: 'State = traffic light: pay() and ship() behave differently per state object.',
    runExpect: 'Paid then Shipped',
  },
  strategy: {
    scene: [
      'Checkout: pick card, UPI, or cash.',
      'Same Pay button, different processing.',
      'Swap method without rewriting checkout.',
    ],
    without: [
      'if (card) … else if (upi) … in pay().',
      'New provider → another elseif.',
      'Algorithm stuck in one method.',
    ],
    with: [
      'PaymentStrategy interface.',
      'Checkout holds one strategy.',
      'Swap at runtime.',
    ],
    codeBridge: 'Strategy = payment picker: checkout.pay() delegates to card vs UPI strategy.',
    runExpect: 'Card paid and UPI paid',
  },
  'template-method': {
    scene: [
      'Tea and coffee: both heat water, brew differs.',
      'Same recipe skeleton.',
      'Subclasses fill unique steps only.',
    ],
    without: [
      'Duplicate prepare() in Tea and Coffee.',
      'Fix heat-water bug in two places.',
      'Easy to skip a step.',
    ],
    with: [
      'Parent defines prepare() sequence.',
      'Subclasses override brew() only.',
      'Order enforced in one place.',
    ],
    codeBridge: 'Template Method = drink recipe: prepare() calls heat → brew() → pour.',
    runExpect: 'Heating water, Steeping, Dripping coffee',
  },
  visitor: {
    scene: [
      'Tax auditor visits each department.',
      'Same visitor, different form per dept.',
      'New audit rule = new visitor class.',
    ],
    without: [
      'exportPdf() on every node class.',
      'New operation → edit all nodes.',
      'Nodes bloated with algorithms.',
    ],
    with: [
      'node.accept(visitor) double dispatch.',
      'TaxVisitor, ExportVisitor separate.',
      'Departments stay unchanged.',
    ],
    codeBridge: 'Visitor = auditor: accept(visitor) calls visitCircle or visitSquare.',
    runExpect: 'Circle area and Square area',
  },
};
