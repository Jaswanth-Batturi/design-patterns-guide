/**
 * One example thread per pattern — same story from analogy through code, run, and tradeoffs.
 */
export interface PatternStory {
  example: string;
  overview?: string;
  problemStatement?: string;
  tradeoffIntro?: string;
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
    overview:
      'Think of one Wi‑Fi router for your entire home. Every laptop, phone, and smart TV uses the same network name and password. In software, some objects (app config, connection pool, logger) must work the same way — one shared instance everyone reads.',
    problemStatement:
      'When every part of the app can create its own copy of shared settings, you get conflicting URLs, duplicate connection pools, and bugs that only show up in production because no one agreed on “the” config.',
    tradeoffIntro:
      'Using the home Wi‑Fi example: without Singleton, each service spins up its own AppConfig (like installing a separate router per room). With Singleton, everyone calls getInstance() and reads the same shared object.',
    scene: [
      'In a normal home, one router broadcasts a single Wi‑Fi name. Your phone, laptop, and TV all join that one network — you do not configure a different router in every bedroom.',
      'If each room had its own router with a different password, your laptop might connect to the kitchen network while your backup software still points at the guest-room network. Data would disagree about “the” connection.',
      'Singleton works the same way in code: one controlled way to get the shared AppConfig object, so every service reads identical settings instead of creating its own copy.',
    ],
    without: [
      'Any class can call new AppConfig(), so you end up with multiple config objects in memory — like multiple routers with different passwords.',
      'One service loads production API URLs while another still points at staging, because they hold different instances.',
      'Tests become painful: there is no single object to mock or reset, and nobody knows which copy is “truth”.',
    ],
    with: [
      'AppConfig.getInstance() is the only door — every caller receives the exact same object, like every device on one Wi‑Fi SSID.',
      'Expensive setup (reading env files, opening pools) happens once, in one place.',
      'When settings change, every part of the app sees the update because they share one instance.',
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
    overview:
      'At a coffee shop you say “latte” at the counter — you never walk into the kitchen or read the recipe book. The barista picks the right drink behind the counter and hands it to you. In code, the client asks for a report type and a factory method returns the right exporter class without the caller knowing construction details.',
    problemStatement:
      'When export logic lives in one giant method full of if/else branches for PDF, Excel, and CSV, every new format forces you to edit that same method. Callers start duplicating construction code, and the export feature becomes a tangled kitchen where everyone cooks their own drink instead of ordering at the counter.',
    tradeoffIntro:
      'Without Factory Method, customers walk into the kitchen and follow recipes themselves. With it, you say “latte” at the counter and the barista returns the right drink class behind the scenes.',
    scene: [
      'You walk up to the counter and say “latte.” You never open the recipe book, measure beans, or steam milk yourself — that work stays behind the counter where it belongs.',
      'If every customer had to enter the kitchen and follow a different recipe card, the line would stall and mistakes would pile up. One person might use the wrong grind; another might forget to froth the milk.',
      'Factory Method works the same way in code: the client names what it wants, and a creator method picks and builds the right concrete class. You get your coffee without knowing which exact recipe class was instantiated.',
    ],
    without: [
      'Customer.order() grows with if/else for latte, espresso, and every new drink means editing the same sprawling method — like every customer walking into the kitchen.',
      'Kiosk screens copy the same recipe branching, so latte logic appears in three places and drifts out of sync.',
      'Adding a mocha requires touching the central dispatcher again instead of dropping in one small drink class.',
    ],
    with: [
      'The customer says order("latte") at the counter — one line, no kitchen access required.',
      'A new drink is just a new Latte or Espresso class; the barista factory wires it in without another elseif in the client.',
      'Recipe details stay behind the counter, so the order-taker code stays stable even when the kitchen adds seasonal drinks.',
    ],
    codeBridge: 'Factory Method = coffee order: the barista picks Latte vs Espresso behind the counter.',
    codeBeforeHint: 'Without Factory — Customer branches on drink type in the kitchen.',
    codeAfterHint: 'With Factory — say “latte”; BaristaFactory returns the right Coffee class.',
    tryItSteps: [
      'Run ▶ — latte and espresso lines print from the same counter.',
    ],
  },
  'abstract-factory': {
    example: 'Matched furniture set',
    overview:
      'When you buy a Scandinavian furniture set, the sofa, table, and lamp all share the same wood finish and fabric. You pick the style once and the whole room stays cohesive. In code, an abstract factory creates a matched family of UI widgets — buttons, checkboxes, and dialogs — so you never mix Mac-style buttons with Windows-style dialogs.',
    problemStatement:
      'When each widget is created independently, screens end up with mismatched families: a Mac button beside a Windows checkbox, or a dark-theme dialog on a light-theme toolbar. Swapping the entire look means hunting down every constructor call instead of replacing one furniture kit.',
    tradeoffIntro:
      'Using the furniture-set example: without Abstract Factory, you assemble random pieces from different stores and the room looks inconsistent. With Abstract Factory, you pick one kit and the factory delivers a matching sofa, table, and lamp together.',
    scene: [
      'You walk into a showroom and choose a Scandinavian furniture set — sofa, coffee table, and floor lamp designed to match. The wood tone, fabric, and leg style all belong together without you comparing swatches for each piece.',
      'If you bought a Victorian chair from one store and a modern glass table from another, the room would feel disjointed. Guests notice the clash even when each piece is fine on its own.',
      'Abstract Factory works the same way in code: you pick MacUIFactory or WinUIFactory once, and every widget it creates shares the same visual family. The whole UI theme changes as one coordinated set.',
    ],
    without: [
      'A screen might instantiate MacButton alongside WindowsCheckbox — like mixing Victorian and modern furniture in one room.',
      'Each widget is chosen in isolation, so visual consistency breaks the moment a developer grabs the wrong constructor.',
      'Switching the entire app theme means editing dozens of individual new calls instead of swapping one factory.',
    ],
    with: [
      'MacUIFactory creates button, checkbox, and dialog together — one matched set from a single showroom choice.',
      'Swap the factory at startup and the entire UI family changes in one move, the way replacing a furniture kit refreshes the whole room.',
      'Clients depend on abstract interfaces, not concrete widget classes, so the kit stays cohesive without the caller knowing Mac from Win internals.',
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
    overview:
      'At a burrito counter you pick rice, beans, and protein step by step while the worker assembles layers in order. You never toss raw ingredients into a bag and hope for the best. In code, a builder lets you set optional fields fluently and calls build() only when the object is complete and valid.',
    problemStatement:
      'When a burrito needs rice, beans, protein, salsa, and cheese, a single constructor with a dozen boolean flags forces callers to pass arguments in the wrong order or skip required layers. Half-built orders leak into the kitchen because nothing validates the stack before wrapping.',
    tradeoffIntro:
      'Using the burrito-counter example: without Builder, you dump every ingredient into one bag at once and pray the order is right. With Builder, you layer rice, beans, and protein step by step, then build() hands you a complete burrito.',
    scene: [
      'You stand at the counter and choose rice, then beans, then carnitas — each topping added in a sensible order. The worker assembles the burrito on the line; you do not reach over and dump raw ingredients into a to-go bag yourself.',
      'If you had to name every ingredient in one breath before anyone started wrapping, you would mix up the order or skip a step. A burrito with rice on the outside and no tortilla is what bad constructors feel like.',
      'Builder works the same way in code: builder.rice().beans().protein().build() layers toppings fluently, and build() returns a complete burrito or fails before anything half-wrapped escapes.',
    ],
    without: [
      'new Burrito(rice, beans, protein, salsa, cheese, guac…) forces twelve positional args — easy to pass false in the wrong slot, like forgetting the tortilla.',
      'Optional toppings multiply constructor overloads, so you end up with Burrito(a,b), Burrito(a,b,c), and still no validation before wrapping.',
      'Half-wrapped burritos float around because nothing enforces that every required layer was added before serving.',
    ],
    with: [
      'builder.rice().beans().protein().build() adds only what you need, in any sensible order, without a 12-argument constructor.',
      'build() validates the burrito before handing it over — missing rice or protein throws early instead of failing at the register.',
      'The counter worker assembles; the customer never cooks at the table, so burrito construction stays readable and safe.',
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
    overview:
      'When you duplicate a meeting-notes template in Google Docs, you get a faithful copy with every heading and table intact. You rename the copy for a new client while the master template stays untouched. In code, prototype.clone() copies a complex object in one step instead of manually copying every field.',
    problemStatement:
      'When teams rebuild complex objects from scratch or copy fields one by one, they miss nested properties, duplicate clone logic across services, and drift from the template. Every new field added to the form requires updating three different hand-rolled copy routines.',
    tradeoffIntro:
      'Using the Google Doc example: without Prototype, you retype every heading or copy fields by hand and inevitably miss one. With Prototype, you hit Duplicate, rename the copy, and the template stays pristine.',
    scene: [
      'You open your meeting-notes template in Google Docs and choose Duplicate. The copy arrives with every heading, table, and footer already in place — you do not retype the structure from scratch.',
      'You change the client name on the copy for this week’s standup. The original template still says “Client Template” so next month’s meeting starts from a clean master again.',
      'Prototype works the same way in code: Form copy = original.clone() produces a faithful duplicate in one call. Edit the copy’s name field; the template object never changes.',
    ],
    without: [
      'Services rebuild a complex Form from database rows on every draft, re-fetching and re-mapping fields that rarely change.',
      'Manual copy.name = …; copy.address = …; copy.items = … spreads across callers, and someone always forgets a nested field.',
      'Clone logic gets duplicated in three services, so adding one new field means hunting down every hand-rolled copy routine.',
    ],
    with: [
      'Form copy = original.clone() duplicates the entire object graph in one step, like hitting Duplicate on the doc.',
      'You edit the copy for Bob while Alice’s template stays untouched — safe experimentation without corrupting the master.',
      'New fields added to Form automatically ride along in clone() when implemented once on the class, not in every caller.',
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
    overview:
      'Your laptop has USB-C but the conference-room projector only accepts HDMI. A small dongle translates the plug shape so neither device needs a redesign. In code, an adapter wraps a legacy payNow(amount) API behind a modern charge(amount) interface your app already expects.',
    problemStatement:
      'When a third-party payment service exposes payNow() but your checkout code expects charge(), every caller ends up with glue code that knows legacy details. Swap the vendor and you rewrite dozens of classes because the wrong plug shape leaked everywhere.',
    tradeoffIntro:
      'Using the dongle example: without Adapter, every app tries to jam USB-C directly into an HDMI port. With Adapter, one small wrapper translates the shape so clients only ever see charge().',
    scene: [
      'You arrive at a client site with a USB-C laptop and a projector that only has HDMI inputs. Without some kind of converter, your presentation simply cannot connect — neither device is “wrong,” they just speak different plug shapes.',
      'A USB-C-to-HDMI dongle sits between them and translates the signal. Your laptop and the projector stay exactly as they are; only the adapter knows both sides.',
      'Adapter works the same way in code: StripeAdapter.charge() calls legacy.payNow() inside, so checkout code speaks PaymentGateway while the old vendor API stays untouched behind the wrapper.',
    ],
    without: [
      'Checkout calls legacy.payNow(amount) directly, so payment details and naming leak into every screen that processes money.',
      'Glue code like amount * 100 and odd parameter order gets copy-pasted into five callers instead of living in one adapter.',
      'Swapping Stripe for a new vendor means rewriting every class that learned the old API shape.',
    ],
    with: [
      'StripeAdapter.charge() translates the modern call into legacy.payNow() internally — one dongle, one translation point.',
      'Clients depend only on PaymentGateway, so the projector port shape never changes for the rest of the app.',
      'Replace the vendor by swapping the adapter class, not by editing every checkout flow in the codebase.',
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
    overview:
      'Your TV remote has the same Power and Volume buttons whether the TV is Sony, Samsung, or LG. The remote (abstraction) stays familiar while each brand decodes signals differently inside the TV (implementation). In code, Bridge separates what you do from how it is done so color and shape can vary independently.',
    problemStatement:
      'When color and shape are locked in one inheritance tree, you get RedCircle, BlueCircle, RedSquare, BlueSquare — a subclass explosion. Adding a new color means creating a new class for every shape, and the two dimensions cannot change independently at runtime.',
    tradeoffIntro:
      'Using the remote-and-TV example: without Bridge, every remote model is welded to one TV brand. With Bridge, the same remote layout drives any TV by swapping the device plugged in behind it.',
    scene: [
      'You pick up a universal remote with Power, Volume, and Channel buttons. The layout feels the same in every hotel room — you never relearn where the buttons are when you switch TVs.',
      'Inside the TV, Sony, Samsung, and LG each decode infrared signals differently. The remote does not need to know brand-specific firmware; it just sends on() to whatever device is paired.',
      'Bridge works the same way in code: Remote holds a Device reference and delegates on() to it. Swap SonyTV for SamsungTV at runtime without creating RedCircle-style subclass matrices.',
    ],
    without: [
      'RedCircle, BlueCircle, RedSquare, BlueSquare multiply fast — every new color requires a new class per shape, like a different remote for every TV brand.',
      'Color and shape are welded in one inheritance tree, so you cannot mix a red fill with a circle outline at runtime without another subclass.',
      'A new rendering backend means subclassing every shape again instead of injecting one implementation object.',
    ],
    with: [
      'Remote holds a Device reference; on() delegates to device.on() — same button layout, any TV brand plugged in behind it.',
      'Swap SonyTV for SamsungTV at runtime by changing the device reference, not by rewriting the remote class hierarchy.',
      'Abstraction (remote) and implementation (TV) vary independently, so two dimensions of change stay decoupled.',
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
    overview:
      'Your Projects folder holds PDFs and nested subfolders, but Delete works the same on both — delete the folder once and everything inside goes with it. You treat the tree as one unit instead of two different mental models. In code, File and Folder share an interface so root.delete() recurses through the whole tree.',
    problemStatement:
      'When files and folders need different APIs and every menu action branches on isFolder(), adding a new node type means updating every traversal. Delete, rename, and size calculations scatter if/else logic across the UI instead of living on the tree itself.',
    tradeoffIntro:
      'Using the project-folder example: without Composite, you write separate deleteFile() and deleteFolder() paths everywhere. With Composite, you delete the Projects folder once and the whole tree handles itself.',
    scene: [
      'Your laptop’s Projects folder contains readme.pdf, assets/, and a nested client-work/ subfolder. In Finder or Explorer, they look like one tree even though some nodes are files and some are containers.',
      'When you hit Delete on the Projects folder, every file and subfolder inside is removed in one action. You do not select each PDF individually or write special logic for “folder vs file” in your head.',
      'Composite works the same way in code: File and Folder both implement delete(), and Folder.delete() recurses into children. One call on the root walks the entire project tree.',
    ],
    without: [
      'Every menu action needs if (node.isFolder()) … else …, so Delete, Rename, and GetSize duplicate branching logic across the UI.',
      'Adding a Symlink or Archive node type means updating every traversal that currently handles only files and folders.',
      'Files and folders expose different APIs, so callers cannot treat a project directory as a single uniform structure.',
    ],
    with: [
      'File and Folder both implement show() and delete(), so the UI calls the same methods whether the node is a leaf or a container.',
      'Folder.delete() recurses into children automatically — like deleting Projects/ removes readme.pdf and everything under assets/.',
      'One call on the project root operates on the whole tree, and new node types plug in by implementing the shared interface.',
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
    overview:
      'You start with base health insurance, then add dental, then vision — each addon wraps the plan but you still hold one policy card. You never need a class named BaseWithDentalAndVisionInsurance. In code, decorators stack behaviors like Encrypt(Buffer(stream)) at runtime without a subclass per combination.',
    problemStatement:
      'When every feature combination needs its own subclass — BufferedFile, EncryptedBufferedFile, CompressedEncryptedBufferedFile — the matrix explodes and you cannot toggle features at runtime. A small change to encryption forces new classes for every stream variant.',
    tradeoffIntro:
      'Using the insurance-addon example: without Decorator, you buy a separate policy class for every combo of benefits. With Decorator, you stack dental and vision addons around the same base plan at runtime.',
    scene: [
      'You enroll in base health insurance and receive one policy card. When open enrollment arrives, you add a dental rider — the dental coverage wraps your existing plan instead of replacing it.',
      'Next year you add vision the same way. You still have one policy to manage, not three separate products named HealthOnly, HealthAndDental, and HealthDentalVision.',
      'Decorator works the same way in code: new Encrypt(new Buffer(stream)) stacks wrappers at runtime. Each decorator shares the same interface and adds behavior around inner.read() without subclass explosion.',
    ],
    without: [
      'BufferedFile, EncryptedBufferedFile, and CompressedEncryptedBufferedFile multiply with every feature combo — like a separate insurance product per addon mix.',
      'You cannot turn encryption on or off at runtime because the behavior is baked into which subclass you instantiated at startup.',
      'Adding compression means new classes for plain, buffered, encrypted, and buffered+encrypted streams instead of one small wrapper.',
    ],
    with: [
      'new Encrypt(new Buffer(stream)) stacks decorators at runtime — add dental, add vision, same policy interface throughout.',
      'Each decorator implements the same Stream interface, so callers never know how many wrappers are layered.',
      'One small class per feature (Buffer, Encrypt, Compress) composes any combination without naming every permutation.',
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
    overview:
      'In a food-delivery app you tap Order food once — behind that single button the kitchen prepares the meal, payment runs, and a driver gets booked. You never call three services yourself. In code, OrderFacade.placeOrder() coordinates inventory, payment, and email so the UI depends on one friendly method.',
    problemStatement:
      'When checkout screens import Inventory, Payment, Email, and SMS directly, subsystem APIs leak into the UI and every screen learns low-level details. Change the delivery provider or email template and you touch dozens of views instead of one coordination layer.',
    tradeoffIntro:
      'Using the food-app example: without Facade, you manually call kitchen, payment, and delivery APIs from every screen. With Facade, one Order food tap runs bookWeekend() and the facade handles the rest inside.',
    scene: [
      'You open a food-delivery app, pick a restaurant, and tap Order food. One button on your phone kicks off everything needed to get dinner to your door.',
      'Behind that tap, the kitchen marks items preparing, the payment gateway charges your card, and dispatch assigns a driver. You never navigate three different admin panels to make one meal happen.',
      'Facade works the same way in code: hotel.bookWeekend() calls reserve, charge, and sendConfirmation inside one method. The UI stays simple while subsystems stay hidden.',
    ],
    without: [
      'Checkout imports Inventory, Payment, Email, and SMS directly, so every screen learns subsystem APIs and error codes.',
      'A payment timeout on one screen needs copy-pasted handling on checkout, mobile, and kiosk flows.',
      'Swapping the email provider means editing every view that ever called sendConfirmation() instead of one facade method.',
    ],
    with: [
      'OrderFacade.placeOrder() coordinates inventory, payment, and notification in one place — the same as one Order food tap.',
      'The UI depends on a single friendly method, so new screens integrate in one line instead of wiring four services.',
      'Subsystem changes stay behind the facade; checkout code never needs to know how confirmation emails are sent.',
    ],
    codeBridge: 'Facade = Order food button: bookWeekend() calls reserve → charge → email inside.',
    codeBeforeHint: 'Without — UI calls inventory, payment, email separately.',
    codeAfterHint: 'With — hotel.bookWeekend() one tap, three subsystems inside.',
    tryItSteps: [
      'Run ▶ — Room reserved, Payment taken, Confirmation emailed (one facade call).',
    ],
  },
  flyweight: {
    example: 'Forest of trees',
    overview:
      'A game forest renders ten thousand oak trees on screen, but only one oak mesh is stored in memory. Each tree object holds just its x/y position while the shared sprite data lives in a factory cache. In code, Flyweight separates intrinsic shared state from extrinsic per-instance data so memory stays bounded.',
    problemStatement:
      'When every tree object stores its own full sprite texture, memory balloons — ten thousand oaks duplicate the same mesh bytes. Garbage collection churns on identical immutable data that should be shared once per tree type.',
    tradeoffIntro:
      'Without Flyweight, every tree embeds duplicate sprite data. With Flyweight, one Oak sprite is shared; each tree only stores where it stands on the map.',
    scene: [
      'You fly over a forest in a game and see thousands of identical oak trees. The engine does not store thousands of separate mesh files — it stores one oak sprite and reuses it at every coordinate.',
      'Each tree on the map only remembers its x and y position. The leaf shape, color, and texture are intrinsic data shared through a factory cache.',
      'Flyweight works the same way in code: TreeFactory.get("Oak") returns the same TreeType for every oak. Position is extrinsic; the sprite is intrinsic and shared.',
    ],
    without: [
      'Every Tree object stores a full sprite texture, so ten thousand oaks allocate ten thousand copies of the same mesh.',
      'Identical oak geometry is duplicated in memory even though only x and y differ per tree.',
      'Garbage collection churns because immutable sprite data is copied instead of referenced from a shared pool.',
    ],
    with: [
      'TreeFactory.get("Oak") returns the same TreeType for every oak — one sprite, many positions.',
      'Extrinsic x/y lives on each tree; intrinsic sprite data lives in the factory cache.',
      'Memory stays bounded because thousands of trees reuse a small set of shared TreeType objects.',
    ],
    codeBridge: 'Flyweight = shared oak sprite: factory.get("Oak") returns one object for every tree.',
    codeBeforeHint: 'Without — each tree stores its own duplicate sprite data.',
    codeAfterHint: 'With — two trees share TreeFactory.get("Oak"); Shared sprite? true.',
    tryItSteps: [
      'Run ▶ — Shared sprite? true for two oaks from the same factory.',
    ],
  },
  proxy: {
    example: 'Netflix thumbnail → Play',
    overview:
      'Netflix shows a thumbnail instantly while you browse, and the full HD stream loads only when you press Play. You still interact with “the movie” — the loading delay is hidden behind the same interface. In code, a proxy stands in for an expensive object and lazy-loads or guards access until it is actually needed.',
    problemStatement:
      'When product pages download full-resolution images on every scroll, or auth checks are copy-pasted before every sensitive call, the UI pays upfront costs for resources it may never use. Remote service details and loading logic leak into screens that should only care about display().',
    tradeoffIntro:
      'Using the Netflix example: without Proxy, every browse loads the full HD file immediately. With Proxy, you see the thumbnail first and the real image loads only when you press Play.',
    scene: [
      'You scroll through Netflix and see movie posters load almost instantly. Those are lightweight thumbnails — the app is not downloading a 4 GB stream for every title you glance at.',
      'When you press Play, the full HD stream begins loading and the player swaps from placeholder to real content. From your perspective you still clicked one movie; the delay is managed behind the scenes.',
      'Proxy works the same way in code: ImageProxy.display() shows a placeholder on first call and lazy-loads the real image on demand, exposing the same interface as the full Image object.',
    ],
    without: [
      'The product page calls loadFullImage() on every scroll event, downloading 4 MB assets for rows the user never clicks — like streaming every movie while browsing.',
      'Auth checks and rate limiting get copy-pasted before every sensitive call because there is no stand-in object to intercept access.',
      'Remote service URLs, retries, and caching logic leak into UI components that should only call display().',
    ],
    with: [
      'ImageProxy.display() lazy-loads on first view and shows a lightweight placeholder until then — thumbnail first, HD on Play.',
      'The proxy implements the same Image interface, so callers never branch on “real vs stand-in” object types.',
      'Expensive setup, access control, and caching live in one proxy class instead of scattered across every screen.',
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
    overview:
      'You email customer support and L1 tries first; if they cannot fix billing, the ticket escalates to billing, then engineering if needed. You do not pick the agent — the ticket walks a chain until someone handles it. In code, each handler either solves the request or forwards to the next link.',
    problemStatement:
      'When one dispatcher method contains a giant if/else on ticket type, priority, and region, adding a new tier means editing the central router. The sender ends up knowing every handler class instead of submitting to the first link and letting the chain decide.',
    tradeoffIntro:
      'Using the support-ticket example: without Chain of Responsibility, one router method decides L1 vs billing vs engineering with nested if/else. With Chain, you submit once and the ticket walks the chain until someone handles it.',
    scene: [
      'You submit a support ticket about a double charge. L1 support reads it first and tries a standard refund workflow — you do not choose which team gets it on day one.',
      'When L1 realizes the issue involves a billing-system bug, they escalate to the billing team. If billing needs a code fix, engineering takes over — each handler either resolves or forwards.',
      'Chain of Responsibility works the same way in code: handlers link together, handle() fixes the issue or passes to next, and the client submits to the first link only.',
    ],
    without: [
      'A central dispatcher grows with if (type == BILLING) … else if (priority > 2) … — every new tier edits the same method.',
      'The code that creates tickets imports L1Handler, BillingHandler, and EngineeringHandler directly instead of trusting the chain.',
      'Reordering escalation rules means rewriting nested conditionals instead of relinking handler objects at runtime.',
    ],
    with: [
      'Handlers link handle() → next: each link tries to fix the ticket or forwards along the chain without the client knowing the path.',
      'Build or reorder the chain at runtime — add a fraud-review step between L1 and billing by inserting one link.',
      'The client submits to the first handler only; the chain decides who ultimately resolves the issue.',
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
    overview:
      'A waiter writes your order on a ticket and drops it in the kitchen queue — the cook works from the ticket, not from your table-side conversation. Void or replay the ticket later; undo pulls the last ticket from a stack. In code, Command encapsulates an action so execute() runs it and undo() reverses it.',
    problemStatement:
      'When toolbar buttons call editor.toggleBold() directly, there is no undo stack, no macro replay, and no audit log of what happened. The UI becomes tightly coupled to editor internals, and the same button cannot easily run different actions across contexts.',
    tradeoffIntro:
      'Using the order-ticket example: without Command, the Bold button yells into the kitchen with no paper trail. With Command, the waiter writes a ticket — execute() runs it and undo() pulls the last ticket back.',
    scene: [
      'You tell the waiter “burger, medium, no onions.” They write it on an order ticket and place it in the kitchen queue — the cook never listens at your table.',
      'If the kitchen misreads an order, the manager can void the ticket or replay it. The ticket is a durable record of what was requested, separate from who pressed the button.',
      'Command works the same way in code: BoldCommand encapsulates the action, execute() runs it, and undo() pops the last command off the stack to restore the previous state.',
    ],
    without: [
      'The Bold toolbar button calls editor.toggleBold() directly, so there is no undo stack and no record of what changed.',
      'Macros and audit logs are impossible because actions are not objects you can queue, replay, or serialize.',
      'The UI imports editor internals, so the same button cannot swap between Bold, Italic, and custom plugins cleanly.',
    ],
    with: [
      'BoldCommand encapsulates the action as an object — write the ticket once, hand it to any executor.',
      'A command stack supports undo: execute() pushes, undo() pops and reverses, like voiding the last kitchen ticket.',
      'The same button runs different commands depending on context, because it invokes command.execute() instead of a hard-coded method.',
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
    overview:
      'Google Calendar understands phrases like “every Monday at 9am” through a small grammar of rules, not a giant string parser. You type natural schedule language and the calendar evaluates it. In code, each rule is an Expression.interpret(context) node you compose into trees like And(RoleAdmin(), RoleEditor()).',
    problemStatement:
      'When permission checks or schedule parsing live in nested string if/else blocks, adding an AND operator or a new role means another branch in an unmaintainable method. Rules become hard to unit-test because logic is buried in procedural parsing instead of small composable classes.',
    tradeoffIntro:
      'Using the calendar-grammar example: without Interpreter, you parse “every Monday at 9am” with fragile string contains checks. With Interpreter, each phrase is a rule node and interpret() walks the grammar tree cleanly.',
    scene: [
      'You type “every Monday at 9am” into Google Calendar’s quick-add box. The app does not run a thousand hard-coded string checks — it evaluates your phrase against a small grammar of recurrence rules.',
      'Adding support for “every other Tuesday” means introducing one new rule class, not rewriting a 400-line parseSchedule() method with another elseif branch.',
      'Interpreter works the same way in code: And(RoleAdmin(), RoleEditor()).interpret(user) composes rules into a tree, and each node knows how to evaluate itself against a context.',
    ],
    without: [
      'Permission checks devolve into nested if (rule.contains("AND")) … else if (rule.contains("admin")) … — fragile and impossible to extend cleanly.',
      'Adding a new AND operator means editing the central parser again instead of composing two existing expression nodes.',
      'Rules are hard to unit-test because evaluation logic is buried in one procedural method instead of small interpret() classes.',
    ],
    with: [
      'Each rule implements Expression.interpret(context), so RoleAdmin and RoleEditor are small, testable classes.',
      'Compose And(admin, editor) to build complex conditions from simple leaves — the same way calendar phrases combine recurrence rules.',
      'New grammar constructs are new classes, not edits to a monolithic parser that everyone is afraid to touch.',
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
    overview:
      'The Next and Previous buttons in a music app work the same whether you are listening to a playlist, an album, or a streaming queue. You never peek at whether songs live in an array or a linked list. In code, Iterator exposes hasNext() and next() so traversal stays uniform while storage stays hidden.',
    problemStatement:
      'When clients loop with get(i) on a raw ArrayList, swapping to LinkedList or a custom queue breaks every caller. Traversal logic gets duplicated in exports, shuffle features, and UI widgets because there is no standard way to walk a collection without knowing its internals.',
    tradeoffIntro:
      'Using the music-app example: without Iterator, Next is wired to array indices and breaks when the playlist storage changes. With Iterator, the same Next button calls hasNext() and next() regardless of what sits behind the queue.',
    scene: [
      'You tap Next in your music app and hear the following track. The button behaves the same for a Spotify playlist, a downloaded album, or a radio queue — you never think about how songs are stored.',
      'Behind the scenes the app might use an array, a linked list, or a lazy stream from the network. If Next were hard-coded to array indices, switching storage would break every screen.',
      'Iterator works the same way in code: hasNext() and next() walk any backing collection uniformly, and multiple iterators can traverse the same playlist independently.',
    ],
    without: [
      'Client code loops with for (i = 0; i < arr.length; i++), tightly coupled to array indexing and length semantics.',
      'Swap ArrayList for LinkedList or a custom queue and every caller that used get(i) breaks or needs rewriting.',
      'Export, shuffle, and “now playing” widgets each reimplement traversal logic instead of sharing one iterator.',
    ],
    with: [
      'Iterator hasNext() and next() work regardless of whether songs live in an array, linked list, or streaming buffer.',
      'Multiple iterators can walk the same collection concurrently — one for playback, one for the UI highlight.',
      'The Next button stays stable because it only knows the iterator interface, not the playlist’s internal structure.',
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
    overview:
      'Pilots radio the control tower instead of calling every other plane on separate frequencies. The tower coordinates who lands when; planes do not mesh-call each other. In code, a ChatRoom mediator routes messages between User colleagues so widgets only know the mediator, not every other widget.',
    problemStatement:
      'When chat widgets hold direct references to each other, adding a new participant means wiring it to every existing widget. Components become impossible to reuse on other screens because they are tangled in a web of two-way dependencies.',
    tradeoffIntro:
      'Using air-traffic-control example: without Mediator, every plane radios every other plane directly. With Mediator, pilots talk to the tower and the tower coordinates landings in one place.',
    scene: [
      'At a busy airport, pilots do not negotiate landing slots plane-to-plane on open radio. They contact air traffic control, and the tower sequences arrivals based on runway rules and spacing.',
      'When a new runway rule is introduced — say, noise restrictions after 10pm — controllers update procedures in one place. Individual pilots do not rewrite their playbooks for every other aircraft.',
      'Mediator works the same way in code: Alice sends a message to the ChatRoom, and the room forwards it to Bob. Widgets talk to the mediator, not to each other’s private methods.',
    ],
    without: [
      'Chat widgets hold references to every other User widget and call them directly — a mesh of two-way dependencies.',
      'Adding one new participant means updating send hooks in every existing widget on the screen.',
      'Components cannot be dropped onto another page because they assume a specific set of sibling references.',
    ],
    with: [
      'The ChatRoom mediator routes messages between colleagues; widgets only know how to talk to the room.',
      'Add Bob by registering with the mediator — existing widgets do not need new imports or callback wiring.',
      'Coordination logic lives in one tower class, the same way runway rules live with air traffic control.',
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
    overview:
      'You save a checkpoint before a boss fight in a game. When you die, you reload that save and the game restores your health and inventory without exposing internal engine fields. In code, the originator creates opaque Memento snapshots and a caretaker stores history for clean undo.',
    problemStatement:
      'When the editor exposes every field so the UI can copy state for undo, encapsulation breaks and the caretaker accidentally mutates live document data. Undo logic scatters across toolbar handlers instead of living in one save/restore flow on the originator.',
    tradeoffIntro:
      'Using the game-checkpoint example: without Memento, undo means hand-editing every stat on the character. With Memento, you save a checkpoint and restore() rewinds to that snapshot without exposing internals.',
    scene: [
      'You reach the boss door in a game and hit Save Checkpoint. The game stores your health, inventory, and position in a save slot you can return to later.',
      'You die on the first attempt and choose Load Checkpoint. Your character rewinds to the saved state without you manually editing HP or item counts in a debug menu.',
      'Memento works the same way in code: the originator creates an opaque snapshot via save(), the caretaker stores it, and restore() rewinds text from hello world back to hello without exposing internal fields.',
    ],
    without: [
      'The editor exposes editor.text as a public field so the toolbar copies it for undo — anyone can mutate live state mid-operation.',
      'The caretaker holds references to the live document and accidentally changes content while “backing up.”',
      'Undo logic is scattered across Bold, Paste, and Delete handlers instead of one originator save/restore API.',
    ],
    with: [
      'The originator creates opaque Memento snapshots via save() — the caretaker cannot peek at or corrupt internal fields.',
      'The caretaker stores a history stack; restore() rewinds cleanly, like loading a game checkpoint.',
      'Undo is a first-class operation on the originator, not a copy-paste ritual spread across every toolbar button.',
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
    overview:
      'You subscribe to AAPL price alerts on your phone and email. When the stock moves, both channels notify you automatically — no polling the market every few seconds. In code, the ticker notifies subscribed observers on setPrice(), and new alert channels join via subscribe() without editing the ticker class.',
    problemStatement:
      'When StockTicker.setPrice() hard-codes calls to phone, email, and analytics services, every new alert channel forces another edit to the ticker. You cannot test alerts in isolation, and the core price-update logic becomes a tangled list of side effects.',
    tradeoffIntro:
      'Using the stock-alert example: without Observer, setPrice() directly dials your phone and sends email inside the ticker. With Observer, you subscribe listeners and setPrice() notifies everyone on the list.',
    scene: [
      'You open your brokerage app and subscribe to AAPL alerts on push notification and email. You do not write a script that polls the market every five seconds — the app pushes updates when the price actually changes.',
      'When AAPL jumps 3%, both your phone and inbox fire at once. Adding SMS later is just another subscription; the stock ticker service itself does not need a code change.',
      'Observer works the same way in code: setPrice() loops registered observers instead of hard-coding PhoneAlert and EmailAlert inside the ticker class.',
    ],
    without: [
      'StockTicker.setPrice() calls phoneService.notify(), emailService.send(), and analytics.track() directly — every new channel edits the ticker again.',
      'Testing price updates requires mocking phone, email, and analytics even when you only care about the core setPrice logic.',
      'Alert channels cannot be added or removed at runtime because they are compiled into the ticker’s method body.',
    ],
    with: [
      'Ticker notifies subscribed observers on price change — subscribe once, get pushed updates like real stock alerts.',
      'New listener = subscribe(new SmsAlert()), no edit to StockTicker, the same way you add SMS in the brokerage app.',
      'Observers stay decoupled from the subject, so price logic and notification logic evolve independently.',
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
    overview:
      'A vending machine walks through insert coin → select item → dispense, and the same buttons behave differently depending on whether it is waiting for money, ready to vend, or out of stock. Rules live in the current mode, not one giant switch. In code, PaidState and ShippedState each implement pay() and ship() while the context delegates to the active state object.',
    problemStatement:
      'When Order status is one big enum with if (status == PAID) ship() chains, every new status means editing every transition. Invalid jumps — like shipping before payment — slip through because all logic sits in one class instead of state objects that only allow valid moves.',
    tradeoffIntro:
      'Using the vending-machine example: without State, one class checks “if waiting for coin, if ready, if empty” on every button press. With State, the machine delegates to the current mode object and each mode owns its own rules.',
    scene: [
      'You approach a vending machine and insert a dollar. The display changes to “select item” — the same physical buttons now mean something different than they did when the machine was waiting for payment.',
      'If the machine is out of stock, pressing the dispense slot does nothing useful even though the button is in the same place. The machine’s current mode decides what each action does.',
      'State works the same way in code: context.pay() and context.ship() delegate to PaidState or ShippedState objects, so behavior lives in the state instead of a sprawling status enum.',
    ],
    without: [
      'if (status == PAID) ship() else if (status == NEW) pay() sprawls across Order — every new status edits the same transition method.',
      'Invalid jumps like ship() before pay() slip through because nothing enforces per-status allowed operations.',
      'Adding a Refunded state means touching every branch that already knows about New, Paid, and Shipped.',
    ],
    with: [
      'PaidState and ShippedState each implement pay() and ship() with only the transitions valid for that mode — like vending-machine modes owning their rules.',
      'The Order context delegates to currentState, so the same method call does different things depending on which state object is active.',
      'New states are new classes with isolated transition logic, not another elseif in a 200-line switch.',
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
    overview:
      'At checkout you pick Card, UPI, or Cash and hit the same Pay button — the cart page does not rewrite itself for each method. A new provider is a new strategy class, not another elseif. In code, Checkout holds a PaymentStrategy reference and pay() delegates to strategy.process().',
    problemStatement:
      'When Checkout.pay() contains if (card) … else if (upi) … else if (cash), adding PayPal means modifying pay() again and testing every branch. Payment algorithms stay trapped in one method instead of interchangeable objects you can swap at runtime.',
    tradeoffIntro:
      'Using the checkout example: without Strategy, Pay is one method full of payment-type if/else. With Strategy, you pick Card or UPI at checkout and pay() delegates to whichever strategy is selected.',
    scene: [
      'You reach checkout on an e-commerce site and see Card, UPI, and Cash as payment options. The Pay button stays in the same place — only the method behind it changes based on your selection.',
      'When the store adds PayPal next quarter, they add a new payment option without rewriting the entire cart page layout or the core checkout flow.',
      'Strategy works the same way in code: Checkout holds a PaymentStrategy reference, and pay() calls strategy.process() — same Pay button, different algorithm plugged in at runtime.',
    ],
    without: [
      'Checkout.pay() grows with if (card) … else if (upi) … else if (cash) … — every new provider edits the same method.',
      'Payment logic cannot be unit-tested in isolation because all algorithms share one sprawling pay() function.',
      'Swapping payment methods at runtime requires branching inside pay() instead of assigning a new strategy object.',
    ],
    with: [
      'Checkout holds a PaymentStrategy reference and pay() delegates to strategy.process() — pick Card or UPI, same Pay button.',
      'Add PayPal by introducing PayPalStrategy without touching the checkout class or its pay() signature.',
      'Algorithms are interchangeable objects you can inject, mock, and test independently of the cart UI.',
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
    overview:
      'Making tea and coffee both follow heat water → brew → pour into cup, but only the brew step differs — steep vs drip. You never duplicate “heat water” in two recipe cards. In code, Beverage.prepare() defines the skeleton and Tea or Coffee override brew() alone.',
    problemStatement:
      'When Tea.prepare() and Coffee.prepare() each duplicate heat and pour steps, a fix to step order must be applied in two places. It is easy to skip a required step in one drink class because there is no single recipe skeleton enforcing the sequence.',
    tradeoffIntro:
      'Using the tea-and-coffee example: without Template Method, each drink recipe repeats heat and pour instructions. With Template Method, prepare() defines the shared skeleton and subclasses only override brew().',
    scene: [
      'You make tea and coffee at home using the same overall ritual: boil water, brew the drink, pour into a cup. The steps are identical until you reach how the flavor is extracted.',
      'For tea you steep the bag; for coffee you drip through grounds. You do not write two full recipe cards that both start with “heat water” copied word for word.',
      'Template Method works the same way in code: Beverage.prepare() calls heat(), brew(), and pour() in order. Tea and Coffee override brew() only; the skeleton lives in one base class.',
    ],
    without: [
      'Tea.prepare() and Coffee.prepare() each duplicate heat water and pour steps — fix the order in one and forget the other.',
      'A new drink like hot chocolate copies the full three-step ritual again instead of reusing the shared skeleton.',
      'Nothing prevents Coffee.prepare() from skipping heat() because each subclass owns the entire sequence independently.',
    ],
    with: [
      'Beverage.prepare() defines heat → brew → pour in one place — the shared recipe card no drink subclass should rewrite.',
      'Tea and Coffee override brew() only: steep vs drip, while heat and pour stay inherited and consistent.',
      'New drinks plug in by overriding the varying step, not by copy-pasting the full preparation ritual.',
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
    overview:
      'A tax auditor visits HR, Engineering, and Sales with the same clipboard but fills a different form at each department. A new audit rule means a new visitor class, not editing every department. In code, node.accept(visitor) uses double-dispatch so TaxVisitor and ExportVisitor stay separate from domain objects.',
    problemStatement:
      'When exportPdf() lives on Circle, Square, and Triangle, every new report type means editing all node classes. Domain objects bloat with algorithms that are not really part of what a shape or department is — they just happen to need exporting.',
    tradeoffIntro:
      'Using the tax-auditor example: without Visitor, every department writes its own export and tax logic inline. With Visitor, the auditor walks the org chart and each department accepts the visitor to run the right form.',
    scene: [
      'A tax auditor arrives at your company with one process but different forms for HR, Engineering, and Sales. Each department hosts the visit; the auditor does not rewrite how HR hires people just to collect payroll data.',
      'When audit rules change next year, the firm sends a new visitor with updated forms. Departments stay focused on their core work instead of accumulating every possible report method.',
      'Visitor works the same way in code: shape.accept(areaVisitor) triggers visitCircle or visitSquare via double-dispatch. New operations are new visitor classes, not edits to every node.',
    ],
    without: [
      'exportPdf(), calculateTax(), and toJson() pile onto Circle, Square, and Triangle — every new report edits every shape class.',
      'Domain objects swell with algorithms that are not intrinsic to being a shape, violating single responsibility.',
      'Adding an area calculator means touching Circle, Square, and Triangle instead of writing one AreaVisitor.',
    ],
    with: [
      'node.accept(visitor) double-dispatches to visitCircle or visitSquare — the auditor brings the form, the department accepts the visit.',
      'TaxVisitor and ExportVisitor live in separate classes, so new operations do not bloat Circle or Square.',
      'Walk the org chart once with one visitor and collect results, the same way an auditor tours every department with one clipboard.',
    ],
    codeBridge: 'Visitor = tax auditor: accept(visitor) calls visitCircle or visitSquare.',
    codeBeforeHint: 'Without — exportPdf() duplicated on every shape class.',
    codeAfterHint: 'With — accept(areaVisitor) prints Circle area and Square area.',
    tryItSteps: [
      'Run ▶ — Circle area and Square area from one visitor walk.',
    ],
  },
};
