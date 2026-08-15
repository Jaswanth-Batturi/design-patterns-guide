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
      'Think of one Wi‑Fi router for your entire home. Every laptop, phone, and smart TV uses the same network name and password. In software, some objects (like AppConfig) must work the same way — one shared instance everyone reads.',
    problemStatement:
      'When every part of the app can call new AppConfig(), you get conflicting URLs, duplicate settings objects, and bugs that only show up in production because no one agreed on “the” config — like every room running its own router with a different password.',
    tradeoffIntro:
      'Using the home Wi‑Fi example: without Singleton, each service spins up its own AppConfig (like installing a separate router per room). With Singleton, everyone calls getInstance() and reads the same shared object.',
    scene: [
      'In a normal home, one router broadcasts a single Wi‑Fi name. Your phone, laptop, and TV all join that one network — you do not configure a different router in every bedroom.',
      'If each room had its own router with a different password, your laptop might connect to the kitchen network while your backup software still points at the guest-room network. Devices would disagree about “the” connection.',
      'Singleton works the same way in code: one controlled way to get the shared AppConfig object, so every service reads identical settings instead of creating its own copy.',
    ],
    without: [
      'Any class can call new AppConfig(), so you end up with multiple config objects in memory — like multiple routers with different passwords.',
      'One service loads production URLs while another still points at staging, because they hold different AppConfig instances.',
      'Tests become painful: there is no single object to mock or reset, and nobody knows which AppConfig copy is “truth”.',
    ],
    with: [
      'AppConfig.getInstance() is the only door — every caller receives the exact same object, like every device on one Wi‑Fi SSID.',
      'Expensive setup (reading env files) happens once, in one place.',
      'When settings change, every part of the app sees the update because they share one AppConfig instance.',
    ],
    codeBridge: 'Same Wi‑Fi idea in code: one getInstance() door instead of scattered new AppConfig().',
    codeBeforeHint: 'Without Singleton — two AppConfig objects, like two routers with different passwords.',
    codeAfterHint: 'With Singleton — getInstance() twice returns the same AppConfig (same Wi‑Fi network).',
    tryItSteps: [
      'Run ▶ — expect Theme is now: dark and Same object? true.',
    ],
  },
  factory: {
    example: 'Coffee shop order',
    overview:
      'At a coffee shop you say “latte” at the counter — you never walk into the kitchen or read the recipe book. The barista picks the right drink behind the counter and hands it to you. In code, the client calls order("latte") and CoffeeShop returns the right Coffee class without knowing construction details.',
    problemStatement:
      'When drink logic lives in one giant method full of if/else branches for latte and espresso, every new drink forces you to edit that same method. Callers start duplicating recipe code, and ordering becomes a tangled kitchen where everyone brews their own drink instead of ordering at the counter.',
    tradeoffIntro:
      'Without Factory Method, customers walk into the kitchen and follow recipes themselves. With it, you say “latte” at the counter and CoffeeShop returns the right drink class behind the scenes.',
    scene: [
      'You walk up to the counter and say “latte.” You never open the recipe book, measure beans, or steam milk yourself — that work stays behind the counter where it belongs.',
      'If every customer had to enter the kitchen and follow a different recipe card, the line would stall and mistakes would pile up. One person might use the wrong grind; another might forget to froth the milk.',
      'Factory Method works the same way in code: the client names what it wants, and CoffeeShop picks and builds the right Coffee class. You get your coffee without knowing which exact recipe class was instantiated.',
    ],
    without: [
      'order() grows with if/else for latte and espresso, and every new drink means editing the same sprawling method — like every customer walking into the kitchen.',
      'Kiosk screens copy the same recipe branching, so latte logic appears in three places and drifts out of sync.',
      'Adding a mocha requires touching the central dispatcher again instead of dropping in one small drink class.',
    ],
    with: [
      'The customer calls order("latte") at the counter — one line, no kitchen access required.',
      'A new drink is just a new Latte or Espresso class; CoffeeShop wires it in without another elseif in the client.',
      'Recipe details stay behind the counter, so the order-taker code stays stable even when the kitchen adds seasonal drinks.',
    ],
    codeBridge: 'Factory Method = coffee order: CoffeeShop picks Latte vs Espresso behind the counter.',
    codeBeforeHint: 'Without Factory — the client branches on drink type in the kitchen.',
    codeAfterHint: 'With Factory — order("latte"); CoffeeShop returns the right Coffee class.',
    tryItSteps: [
      'Run ▶ — latte and espresso lines print from the same counter.',
    ],
  },
  'abstract-factory': {
    example: 'Matched furniture set',
    overview:
      'When you buy a Scandinavian furniture set, the sofa, lamp, and table all share the same wood finish and fabric. You pick the style once and the whole room stays cohesive. In code, an abstract factory creates a matched family — sofa, lamp, table — so you never mix a Scandinavian sofa with a Modern lamp.',
    problemStatement:
      'When each piece is created independently, rooms end up with mismatched families: a Scandinavian sofa beside a Modern lamp, or a light-wood table under a black-metal lamp. Swapping the entire look means hunting down every constructor call instead of replacing one furniture kit.',
    tradeoffIntro:
      'Using the furniture-set example: without Abstract Factory, you assemble random pieces from different stores and the room looks inconsistent. With Abstract Factory, you pick one kit and it delivers a matching sofa, lamp, and table together.',
    scene: [
      'You walk into a showroom and choose a Scandinavian furniture set — sofa, lamp, and table designed to match. The wood tone, fabric, and leg style all belong together without you comparing swatches for each piece.',
      'If you bought a Modern glass table from one store and a Scandinavian sofa from another, the room would feel disjointed. Guests notice the clash even when each piece is fine on its own.',
      'Abstract Factory works the same way in code: you pick ScandinavianFactory or ModernFactory once, and every piece it creates shares the same visual family. The whole room changes as one coordinated set.',
    ],
    without: [
      'A room might instantiate a Scandinavian sofa alongside a Modern lamp — mixing two furniture styles in one space.',
      'Each piece is chosen in isolation, so consistency breaks the moment a developer grabs the wrong constructor.',
      'Switching the entire style means editing dozens of individual new calls instead of swapping one factory.',
    ],
    with: [
      'ScandinavianFactory creates sofa, lamp, and table together — one matched set from a single showroom choice.',
      'Swap to ModernFactory at startup and the entire family changes in one move, the way replacing a furniture kit refreshes the whole room.',
      'Clients depend on abstract Sofa/Lamp/Table interfaces, not concrete classes, so the kit stays cohesive without the caller knowing Scandinavian from Modern internals.',
    ],
    codeBridge: 'Abstract Factory = furniture set: one factory builds a matching sofa, lamp, and table.',
    codeBeforeHint: 'Without — Scandinavian sofa + Modern lamp (mixed furniture styles).',
    codeAfterHint: 'With — one factory creates a matched sofa, lamp, and table set.',
    tryItSteps: [
      'Run ▶ — see Scandinavian and Modern sets printed as matched furniture.',
    ],
  },
  builder: {
    example: 'Burrito counter',
    overview:
      'At a burrito counter you pick rice, beans, and protein step by step while the worker assembles layers in order. You never toss raw ingredients into a bag and hope for the best. In code, a Burrito builder lets you set toppings fluently and calls build() only when the burrito is complete and valid.',
    problemStatement:
      'When a burrito needs rice, beans, protein, salsa, and cheese, a single constructor with a dozen flags forces callers to pass arguments in the wrong order or skip required layers. Half-built orders leak into the kitchen because nothing validates the stack before wrapping.',
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
    codeBridge: 'Builder = burrito line: fluent steps, then build() returns the finished burrito.',
    codeBeforeHint: 'Without — one giant Burrito constructor (everything in one bag, error-prone).',
    codeAfterHint: 'With — layer rice, beans, protein, then build().',
    tryItSteps: [
      'Run ▶ — prints the built burrito with its layers.',
    ],
  },
  prototype: {
    example: 'Duplicate Google Doc',
    overview:
      'When you duplicate a meeting-notes template in Google Docs, you get a faithful copy with every heading and table intact. You rename the copy for a new client while the master template stays untouched. In code, document.clone() copies a complex Document in one step instead of manually copying every field.',
    problemStatement:
      'When teams rebuild a complex Document from scratch or copy fields one by one, they miss nested properties, duplicate clone logic across services, and drift from the template. Every new field added to the doc requires updating three different hand-rolled copy routines.',
    tradeoffIntro:
      'Using the Google Doc example: without Prototype, you retype every heading or copy fields by hand and inevitably miss one. With Prototype, you hit Duplicate, rename the copy, and the template stays pristine.',
    scene: [
      'You open your meeting-notes template in Google Docs and choose Duplicate. The copy arrives with every heading, table, and footer already in place — you do not retype the structure from scratch.',
      'You change the client name on the copy for this week’s standup. The original template still says “Client Template” so next month’s meeting starts from a clean master again.',
      'Prototype works the same way in code: Document copy = original.clone() produces a faithful duplicate in one call. Edit the copy’s title; the template Document never changes.',
    ],
    without: [
      'Services rebuild a complex Document from database rows on every draft, re-fetching and re-mapping fields that rarely change.',
      'Manual copy.title = …; copy.body = …; copy.sections = … spreads across callers, and someone always forgets a nested field.',
      'Clone logic gets duplicated in three services, so adding one new field means hunting down every hand-rolled copy routine.',
    ],
    with: [
      'Document copy = original.clone() duplicates the entire object graph in one step, like hitting Duplicate on the doc.',
      'You edit the copy for a new client while the original template stays untouched — safe experimentation without corrupting the master.',
      'New fields added to Document automatically ride along in clone() when implemented once on the class, not in every caller.',
    ],
    codeBridge: 'Prototype = Duplicate doc: clone() then edit the copy’s title.',
    codeBeforeHint: 'Without — copy every Document field by hand from the template.',
    codeAfterHint: 'With — clone() duplicates the template; rename the copy.',
    tryItSteps: [
      'Run ▶ — original template title, then the renamed copy.',
    ],
  },
  adapter: {
    example: 'USB‑C → HDMI dongle',
    overview:
      'Your laptop has USB‑C but the conference-room projector only accepts HDMI. A small dongle translates the plug shape so neither device needs a redesign. In code, an HdmiAdapter wraps an HdmiProjector behind the modern display interface your Laptop already expects.',
    problemStatement:
      'When the HdmiProjector exposes projectHdmi() but your Laptop expects display(), every caller ends up with glue code that knows projector details. Swap the hardware and you rewrite dozens of classes because the wrong plug shape leaked everywhere.',
    tradeoffIntro:
      'Using the dongle example: without Adapter, every app tries to jam USB‑C directly into an HDMI port. With Adapter, one small wrapper translates the shape so the Laptop only ever calls display().',
    scene: [
      'You arrive at a client site with a USB‑C laptop and a projector that only has HDMI inputs. Without some kind of converter, your presentation simply cannot connect — neither device is “wrong,” they just speak different plug shapes.',
      'A USB‑C‑to‑HDMI dongle sits between them and translates the signal. Your laptop and the projector stay exactly as they are; only the adapter knows both sides.',
      'Adapter works the same way in code: HdmiAdapter.display() calls projector.projectHdmi() inside, so the Laptop speaks one display interface while the HdmiProjector stays untouched behind the wrapper.',
    ],
    without: [
      'The Laptop calls projector.projectHdmi() directly, so HDMI details and naming leak into every screen that shows output.',
      'Glue code for signal conversion gets copy-pasted into five callers instead of living in one adapter.',
      'Swapping the projector for new hardware means rewriting every class that learned the old HDMI API shape.',
    ],
    with: [
      'HdmiAdapter.display() translates the modern call into projector.projectHdmi() internally — one dongle, one translation point.',
      'The Laptop depends only on the display interface, so the projector port shape never changes for the rest of the app.',
      'Replace the hardware by swapping the adapter class, not by editing every screen that drives the projector.',
    ],
    codeBridge: 'Adapter = USB‑C dongle: wrap HdmiProjector.projectHdmi() behind display().',
    codeBeforeHint: 'Without — call projector.projectHdmi() directly (wrong plug shape).',
    codeAfterHint: 'With — adapter.display() translates to projectHdmi() internally.',
    tryItSteps: [
      'Run ▶ — Laptop output shown on the HDMI projector through the adapter.',
    ],
  },
  bridge: {
    example: 'TV remote + TV brand',
    overview:
      'Your TV remote has the same Power and Volume buttons whether the TV is Sony, Samsung, or LG. The remote (abstraction) stays familiar while each brand decodes signals differently inside the TV (implementation). In code, Bridge separates the remote type from the TV brand so both vary independently.',
    problemStatement:
      'When the remote type and TV brand are locked in one inheritance tree, you get SonyBasicRemote, SonyAdvancedRemote, SamsungBasicRemote, SamsungAdvancedRemote — a subclass explosion. Adding a new brand means creating a new class for every remote type, and the two dimensions cannot change independently at runtime.',
    tradeoffIntro:
      'Using the remote-and-TV example: without Bridge, every remote model is welded to one TV brand. With Bridge, the same remote layout drives any TV by swapping the device plugged in behind it.',
    scene: [
      'You pick up a remote with Power, Volume, and Channel buttons. The layout feels the same in every hotel room — you never relearn where the buttons are when you switch TVs.',
      'Inside the TV, Sony, Samsung, and LG each decode infrared signals differently. The remote does not need to know brand-specific firmware; it just sends on() to whatever device is paired.',
      'Bridge works the same way in code: Remote holds a TV reference and delegates power() to it. Swap SonyTV for SamsungTV at runtime without building a remote-times-brand subclass matrix.',
    ],
    without: [
      'SonyBasicRemote, SonyAdvancedRemote, SamsungBasicRemote, SamsungAdvancedRemote multiply fast — every new brand requires a new class per remote type.',
      'Remote type and TV brand are welded in one inheritance tree, so you cannot pair an advanced remote with an LG TV at runtime without another subclass.',
      'A new TV brand means adding one TV implementation class per brand instead of subclassing every remote type again.',
    ],
    with: [
      'Remote holds a TV reference; power() delegates to tv.on() — same button layout, any TV brand plugged in behind it.',
      'Swap SonyTV for SamsungTV at runtime by changing the device reference, not by rewriting the remote class hierarchy.',
      'The remote abstraction and the TV implementation vary independently, so both dimensions of change stay decoupled.',
    ],
    codeBridge: 'Bridge = remote + TV: Remote.power() calls tv.on() — brand differs inside.',
    codeBeforeHint: 'Without — SonyAdvancedRemote + SamsungBasicRemote class matrix.',
    codeAfterHint: 'With — one Remote holds a SonyTV or SamsungTV device.',
    tryItSteps: [
      'Run ▶ — same Power press on Sony TV and Samsung TV.',
    ],
  },
  composite: {
    example: 'Project folder on laptop',
    overview:
      'Your Projects folder holds files and nested subfolders, but Delete works the same on both — delete the folder once and everything inside goes with it. You treat the tree as one unit instead of two different mental models. In code, File and Folder share an interface so root.delete() recurses through the whole tree.',
    problemStatement:
      'When files and folders need different APIs and every menu action branches on isFolder(), adding a new node type means updating every traversal. Delete, rename, and size calculations scatter if/else logic across the UI instead of living on the tree itself.',
    tradeoffIntro:
      'Using the project-folder example: without Composite, you write separate deleteFile() and deleteFolder() paths everywhere. With Composite, you delete the Projects folder once and the whole tree handles itself.',
    scene: [
      'Your laptop’s Projects folder contains readme.pdf, assets/, and a nested client-work/ subfolder. In Finder or Explorer, they look like one tree even though some nodes are files and some are containers.',
      'When you hit Delete on the Projects folder, every file and subfolder inside is removed in one action. You do not select each file individually or write special logic for “folder vs file” in your head.',
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
      'Run ▶ — project folder and files printed in one tree walk.',
    ],
  },
  decorator: {
    example: 'Insurance plan addons',
    overview:
      'You start with a base health policy, then add dental, then vision — each addon wraps the plan but you still hold one policy card. You never need a class named HealthWithDentalAndVisionPolicy. In code, decorators stack coverage like Vision(Dental(base)) at runtime without a subclass per combination.',
    problemStatement:
      'When every coverage combination needs its own subclass — DentalPolicy, DentalVisionPolicy, DentalVisionAccidentPolicy — the matrix explodes and you cannot toggle addons at runtime. A small change to dental coverage forces new classes for every policy variant.',
    tradeoffIntro:
      'Using the insurance-addon example: without Decorator, you buy a separate policy class for every combo of benefits. With Decorator, you stack dental and vision addons around the same base plan at runtime.',
    scene: [
      'You enroll in a base health policy and receive one policy card. When open enrollment arrives, you add a dental rider — the dental coverage wraps your existing plan instead of replacing it.',
      'Next year you add vision the same way. You still have one policy to manage, not three separate products named HealthOnly, HealthAndDental, and HealthDentalVision.',
      'Decorator works the same way in code: new Vision(new Dental(base)) stacks addons at runtime. Each decorator shares the same HealthPolicy interface and adds coverage around inner.cost() without subclass explosion.',
    ],
    without: [
      'DentalPolicy, DentalVisionPolicy, and DentalVisionAccidentPolicy multiply with every addon combo — a separate product per coverage mix.',
      'You cannot turn dental on or off at runtime because the coverage is baked into which subclass you instantiated at enrollment.',
      'Adding accident coverage means new classes for plain, dental, vision, and dental+vision policies instead of one small wrapper.',
    ],
    with: [
      'new Vision(new Dental(base)) stacks addons at runtime — add dental, add vision, same policy interface throughout.',
      'Each addon implements the same HealthPolicy interface, so callers never know how many riders are layered.',
      'One small class per addon (Dental, Vision, Accident) composes any combination without naming every permutation.',
    ],
    codeBridge: 'Decorator = insurance addons: each wrapper adds coverage around inner.cost().',
    codeBeforeHint: 'Without — subclass every combination of policy coverage.',
    codeAfterHint: 'With — base policy wrapped with Dental then Vision addons.',
    tryItSteps: [
      'Run ▶ — base premium grows as dental and vision addons stack.',
    ],
  },
  facade: {
    example: 'Food app “Order food”',
    overview:
      'In a food-delivery app you tap Order food once — behind that single button the kitchen prepares the meal, payment runs, and a driver gets booked. You never call three services yourself. In code, FoodApp.orderFood() coordinates Kitchen, Payment, and Delivery so the UI depends on one friendly method.',
    problemStatement:
      'When checkout screens call Kitchen, Payment, and Delivery directly, subsystem APIs leak into the UI and every screen learns low-level details. Change the delivery provider or payment flow and you touch dozens of views instead of one coordination layer.',
    tradeoffIntro:
      'Using the food-app example: without Facade, you manually call kitchen, payment, and delivery APIs from every screen. With Facade, one Order food tap runs orderFood() and the facade handles the rest inside.',
    scene: [
      'You open a food-delivery app, pick a restaurant, and tap Order food. One button on your phone kicks off everything needed to get dinner to your door.',
      'Behind that tap, the kitchen marks items preparing, the payment gateway charges your card, and dispatch assigns a driver. You never navigate three different admin panels to make one meal happen.',
      'Facade works the same way in code: FoodApp.orderFood() calls kitchen.prepare(), payment.charge(), and delivery.dispatch() inside one method. The UI stays simple while subsystems stay hidden.',
    ],
    without: [
      'Checkout calls Kitchen, Payment, and Delivery directly, so every screen learns subsystem APIs and error codes.',
      'A payment timeout on one screen needs copy-pasted handling on checkout, mobile, and kiosk flows.',
      'Swapping the delivery provider means editing every view that ever called dispatch() instead of one facade method.',
    ],
    with: [
      'FoodApp.orderFood() coordinates kitchen, payment, and delivery in one place — the same as one Order food tap.',
      'The UI depends on a single friendly method, so new screens integrate in one line instead of wiring three services.',
      'Subsystem changes stay behind the facade; checkout code never needs to know how a driver is dispatched.',
    ],
    codeBridge: 'Facade = Order food button: orderFood() calls kitchen → payment → delivery inside.',
    codeBeforeHint: 'Without — UI calls kitchen, payment, delivery separately.',
    codeAfterHint: 'With — foodApp.orderFood() one tap, three subsystems inside.',
    tryItSteps: [
      'Run ▶ — Meal prepared, Payment taken, Driver dispatched (one facade call).',
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
      'Netflix shows a thumbnail instantly while you browse, and the full HD stream loads only when you press Play. You still interact with “the movie” — the loading delay is hidden behind the same interface. In code, an ImageProxy stands in for the expensive Image and lazy-loads it only when display() is actually called.',
    problemStatement:
      'When the browse page downloads full-resolution images on every scroll, the UI pays upfront costs for streams it may never play. Loading logic leaks into screens that should only care about display().',
    tradeoffIntro:
      'Using the Netflix example: without Proxy, every browse loads the full HD file immediately. With Proxy, you see the thumbnail first and the real image loads only when you press Play.',
    scene: [
      'You scroll through Netflix and see movie posters load almost instantly. Those are lightweight thumbnails — the app is not downloading a 4 GB stream for every title you glance at.',
      'When you press Play, the full HD stream begins loading and the player swaps from placeholder to real content. From your perspective you still clicked one movie; the delay is managed behind the scenes.',
      'Proxy works the same way in code: ImageProxy.display() shows a placeholder on first call and lazy-loads the real Image on demand, exposing the same interface as the full Image object.',
    ],
    without: [
      'The browse page calls loadFullImage() on every scroll event, downloading heavy assets for rows the user never clicks — like streaming every movie while browsing.',
      'Caching and load state get copy-pasted before every image call because there is no stand-in object to intercept access.',
      'Stream URLs, retries, and caching logic leak into UI components that should only call display().',
    ],
    with: [
      'ImageProxy.display() lazy-loads on first view and shows a lightweight placeholder until then — thumbnail first, HD on Play.',
      'The proxy implements the same Image interface, so callers never branch on “real vs stand-in” object types.',
      'Expensive setup and caching live in one proxy class instead of scattered across every screen.',
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
      'You email customer support and L1 tries first; if they cannot fix billing, the ticket escalates to Billing, then Engineering if needed. You do not pick the agent — the ticket walks a chain until someone handles it. In code, each handler either solves the request or forwards to the next link.',
    problemStatement:
      'When one dispatcher method contains a giant if/else on ticket type and priority, adding a new tier means editing the central router. The sender ends up knowing every handler class instead of submitting to the first link and letting the chain decide.',
    tradeoffIntro:
      'Using the support-ticket example: without Chain of Responsibility, one router method decides L1 vs Billing vs Engineering with nested if/else. With Chain, you submit once and the ticket walks the chain until someone handles it.',
    scene: [
      'You submit a support ticket about a double charge. L1 support reads it first and tries a standard refund workflow — you do not choose which team gets it on day one.',
      'When L1 realizes the issue involves a billing-system bug, they escalate to the Billing team. If Billing needs a code fix, Engineering takes over — each handler either resolves or forwards.',
      'Chain of Responsibility works the same way in code: handlers link together, handle() fixes the issue or passes to next, and the client submits to the first link only.',
    ],
    without: [
      'A central dispatcher grows with if (type == BILLING) … else if (priority > 2) … — every new tier edits the same method.',
      'The code that creates tickets imports L1Handler, BillingHandler, and EngineeringHandler directly instead of trusting the chain.',
      'Reordering escalation rules means rewriting nested conditionals instead of relinking handler objects at runtime.',
    ],
    with: [
      'Handlers link handle() → next: each link tries to fix the ticket or forwards along the chain without the client knowing the path.',
      'Build or reorder the chain at runtime — add a fraud-review step between L1 and Billing by inserting one link.',
      'The client submits to the first handler only; the chain decides who ultimately resolves the ticket.',
    ],
    codeBridge: 'Chain = support tiers: handle() fixes or passes to next link.',
    codeBeforeHint: 'Without — if (billing) … else if (engineering) … in one method.',
    codeAfterHint: 'With — chain.handle(ticket) walks L1 → Billing → Engineering.',
    tryItSteps: [
      'Run ▶ — L1 fixed and Engineering fixed lines for different tickets.',
    ],
  },
  command: {
    example: 'Text editor undo',
    overview:
      'In a text editor, pressing Bold does not just flip a flag — it records an action you can undo. Ctrl+Z pulls the last action off a stack and reverses it. In code, Command wraps an action like BoldCommand so execute() runs it and undo() reverses it via an undo stack.',
    problemStatement:
      'When the Bold button calls editor.toggleBold() directly, there is no undo stack, no macro replay, and no history of what happened. The UI becomes tightly coupled to editor internals, and the same button cannot easily run different actions across contexts.',
    tradeoffIntro:
      'Using the text-editor example: without Command, the Bold button flips state with no undo trail. With Command, BoldCommand.execute() runs it and undo() pops the last action off the stack.',
    scene: [
      'You select a word in your text editor and press Bold. The text turns bold — but the editor also remembers this as a discrete action, not just a changed pixel.',
      'You press Ctrl+Z and the bold is removed. The editor pulled the last action off an undo stack and reversed it, without you telling it exactly which field to flip back.',
      'Command works the same way in code: BoldCommand encapsulates the action, execute() runs it, and undo() pops the last command off the stack to restore the previous state.',
    ],
    without: [
      'The Bold toolbar button calls editor.toggleBold() directly, so there is no undo stack and no record of what changed.',
      'Macros and history are impossible because actions are not objects you can queue, replay, or reverse.',
      'The UI imports editor internals, so the same button cannot swap between Bold, Italic, and custom plugins cleanly.',
    ],
    with: [
      'BoldCommand encapsulates the action as an object — create it once, hand it to any invoker.',
      'A command stack supports undo: execute() pushes, undo() pops and reverses, like Ctrl+Z in the editor.',
      'The same button runs different commands depending on context, because it invokes command.execute() instead of a hard-coded method.',
    ],
    codeBridge: 'Command = editor undo: execute() runs, undo() pops the stack and reverses.',
    codeBeforeHint: 'Without — Bold button calls toggleBold() directly (no undo stack).',
    codeAfterHint: 'With — BoldCommand.execute() then undo() restores previous state.',
    tryItSteps: [
      'Run ▶ — Bold true then false after undo.',
    ],
  },
  interpreter: {
    example: 'App permission rules',
    overview:
      'An app decides access with rules like “admin OR editor” instead of one tangled string parser. Each role check is a small rule you compose into conditions. In code, each rule is an Expression.interpret(user) node you combine into trees like Or(RoleAdmin(), RoleEditor()).',
    problemStatement:
      'When permission checks live in nested string if/else blocks, adding an OR operator or a new role means another branch in an unmaintainable method. Rules become hard to unit-test because logic is buried in procedural parsing instead of small composable classes.',
    tradeoffIntro:
      'Using the permission-rules example: without Interpreter, you check access with fragile string contains checks. With Interpreter, each role is a rule node and interpret() walks the grammar tree cleanly.',
    scene: [
      'Your app grants access when a user is “admin OR editor.” The check does not run a thousand hard-coded string comparisons — it evaluates the rule against a small grammar of role expressions.',
      'Adding support for “admin AND owner” means introducing one new rule node, not rewriting a 400-line checkAccess() method with another elseif branch.',
      'Interpreter works the same way in code: Or(RoleAdmin(), RoleEditor()).interpret(user) composes rules into a tree, and each node knows how to evaluate itself against a user context.',
    ],
    without: [
      'Permission checks devolve into nested if (rule.contains("OR")) … else if (rule.contains("admin")) … — fragile and impossible to extend cleanly.',
      'Adding a new OR operator means editing the central parser again instead of composing two existing expression nodes.',
      'Rules are hard to unit-test because evaluation logic is buried in one procedural method instead of small interpret() classes.',
    ],
    with: [
      'Each rule implements Expression.interpret(user), so RoleAdmin and RoleEditor are small, testable classes.',
      'Compose Or(admin, editor) to build complex conditions from simple leaves — the same way permission rules combine roles.',
      'New grammar constructs are new classes, not edits to a monolithic parser that everyone is afraid to touch.',
    ],
    codeBridge: 'Interpreter = permission rules: Or(admin, editor).interpret(user).',
    codeBeforeHint: 'Without — parse rule strings with if (contains "OR")…',
    codeAfterHint: 'With — rule.interpret(user): admin passes, guest fails.',
    tryItSteps: [
      'Run ▶ — admin passes true, guest false.',
    ],
  },
  iterator: {
    example: 'Music app Next button',
    overview:
      'The Next and Previous buttons in a music app work the same whether you are listening to a playlist, an album, or a streaming queue. You never peek at whether songs live in an array or a linked list. In code, a playlist Iterator exposes hasNext() and next() so traversal stays uniform while storage stays hidden.',
    problemStatement:
      'When clients loop with get(i) on a raw list, swapping to a linked list or a custom queue breaks every caller. Traversal logic gets duplicated in shuffle features and UI widgets because there is no standard way to walk the playlist without knowing its internals.',
    tradeoffIntro:
      'Using the music-app example: without Iterator, Next is wired to array indices and breaks when the playlist storage changes. With Iterator, the same Next button calls hasNext() and next() regardless of what sits behind the queue.',
    scene: [
      'You tap Next in your music app and hear the following track. The button behaves the same for a Spotify playlist, a downloaded album, or a radio queue — you never think about how songs are stored.',
      'Behind the scenes the app might use an array, a linked list, or a lazy stream from the network. If Next were hard-coded to array indices, switching storage would break every screen.',
      'Iterator works the same way in code: hasNext() and next() walk any backing collection uniformly, and multiple iterators can traverse the same playlist independently.',
    ],
    without: [
      'Client code loops with for (i = 0; i < arr.length; i++), tightly coupled to array indexing and length semantics.',
      'Swap the array for a linked list or a custom queue and every caller that used get(i) breaks or needs rewriting.',
      'Shuffle and “now playing” widgets each reimplement traversal logic instead of sharing one iterator.',
    ],
    with: [
      'Iterator hasNext() and next() work regardless of whether songs live in an array, linked list, or streaming buffer.',
      'Multiple iterators can walk the same playlist concurrently — one for playback, one for the UI highlight.',
      'The Next button stays stable because it only knows the iterator interface, not the playlist’s internal structure.',
    ],
    codeBridge: 'Iterator = Next button: walk songs without knowing the internal list type.',
    codeBeforeHint: 'Without — for (i=0; i<arr.length) tied to array indices.',
    codeAfterHint: 'With — while (it.hasNext()) plays Intro, Verse, Chorus.',
    tryItSteps: [
      'Run ▶ — Now playing: Intro, Verse, Chorus.',
    ],
  },
  mediator: {
    example: 'Group chat room',
    overview:
      'In a group chat, you send a message to the room and the room delivers it to everyone — you do not open a separate direct line to each person. The room coordinates who sees what. In code, a ChatRoom mediator routes messages between User members so each user only knows the room, not every other user.',
    problemStatement:
      'When chat members hold direct references to each other, adding a new participant means wiring it to every existing member. Components become impossible to reuse on other screens because they are tangled in a web of two-way dependencies.',
    tradeoffIntro:
      'Using the group-chat example: without Mediator, every member messages every other member directly. With Mediator, users send to the ChatRoom and the room delivers to everyone in one place.',
    scene: [
      'In a group chat, you type one message and everyone in the room receives it. You do not manually copy each person on a separate thread — the room handles delivery.',
      'When a new person joins, they just register with the room. Existing members do not rewire their contacts to include the newcomer.',
      'Mediator works the same way in code: Alice sends a message to the ChatRoom, and the room forwards it to Bob. Members talk to the mediator, not to each other’s private methods.',
    ],
    without: [
      'Chat members hold references to every other User and message them directly — a mesh of two-way dependencies.',
      'Adding one new participant means updating send hooks in every existing member on the screen.',
      'Members cannot be dropped into another room because they assume a specific set of sibling references.',
    ],
    with: [
      'The ChatRoom mediator routes messages between members; each user only knows how to talk to the room.',
      'Add Bob by registering with the mediator — existing members do not need new imports or callback wiring.',
      'Coordination logic lives in one ChatRoom class, so members stay simple and reusable.',
    ],
    codeBridge: 'Mediator = group chat: Alice sends to ChatRoom; room forwards to Bob.',
    codeBeforeHint: 'Without — User members message each other directly.',
    codeAfterHint: 'With — Alice -> Bob: Hi through the ChatRoom mediator.',
    tryItSteps: [
      'Run ▶ — Alice -> Bob through the ChatRoom mediator.',
    ],
  },
  memento: {
    example: 'Document undo snapshots',
    overview:
      'A document editor lets you undo back through earlier versions because it quietly saves snapshots as you type. Undo restores a snapshot without exposing the editor’s internal fields. In code, the Editor creates opaque Memento snapshots and a history caretaker stores them for clean undo.',
    problemStatement:
      'When the Editor exposes every field so the UI can copy state for undo, encapsulation breaks and the caretaker accidentally mutates live document data. Undo logic scatters across toolbar handlers instead of living in one save/restore flow on the Editor.',
    tradeoffIntro:
      'Using the document-undo example: without Memento, undo means hand-copying the editor’s public text. With Memento, the Editor saves a snapshot and restore() rewinds to it without exposing internals.',
    scene: [
      'You type in a document editor and it quietly saves a snapshot of the text at each step. You can walk backward through those versions later.',
      'You press Undo and the text rewinds to an earlier snapshot — you do not manually reconstruct the previous content field by field.',
      'Memento works the same way in code: the Editor creates an opaque snapshot via save(), the history caretaker stores it, and restore() rewinds text from hello world back to hello without exposing internal fields.',
    ],
    without: [
      'The Editor exposes editor.text as a public field so the toolbar copies it for undo — anyone can mutate live state mid-operation.',
      'The caretaker holds references to the live document and accidentally changes content while “backing up.”',
      'Undo logic is scattered across Bold, Paste, and Delete handlers instead of one Editor save/restore API.',
    ],
    with: [
      'The Editor creates opaque Memento snapshots via save() — the caretaker cannot peek at or corrupt internal fields.',
      'The caretaker stores a history stack; restore() rewinds cleanly to an earlier document version.',
      'Undo is a first-class operation on the Editor, not a copy-paste ritual spread across every toolbar button.',
    ],
    codeBridge: 'Memento = document history: save() snapshot, restore() rewinds text.',
    codeBeforeHint: 'Without — backup = editor.text (public field copy).',
    codeAfterHint: 'With — hello world then hello after undo restore.',
    tryItSteps: [
      'Run ▶ — hello world then hello after undo.',
    ],
  },
  observer: {
    example: 'Stock price alerts',
    overview:
      'You subscribe to AAPL price alerts on your phone and email. When the stock moves, both channels notify you automatically — no polling the market every few seconds. In code, StockTicker notifies subscribed observers on setPrice(), and new alert channels join via subscribe() without editing the ticker class.',
    problemStatement:
      'When StockTicker.setPrice() hard-codes calls to phone and email services, every new alert channel forces another edit to the ticker. You cannot test alerts in isolation, and the core price-update logic becomes a tangled list of side effects.',
    tradeoffIntro:
      'Using the stock-alert example: without Observer, setPrice() directly dials your phone and sends email inside the ticker. With Observer, you subscribe listeners and setPrice() notifies everyone on the list.',
    scene: [
      'You open your brokerage app and subscribe to AAPL alerts on push notification and email. You do not write a script that polls the market every five seconds — the app pushes updates when the price actually changes.',
      'When AAPL jumps 3%, both your phone and inbox fire at once. Adding SMS later is just another subscription; the StockTicker itself does not need a code change.',
      'Observer works the same way in code: setPrice() loops registered observers instead of hard-coding PhoneAlert and EmailAlert inside the StockTicker class.',
    ],
    without: [
      'StockTicker.setPrice() calls phoneService.notify() and emailService.send() directly — every new channel edits the ticker again.',
      'Testing price updates requires mocking phone and email even when you only care about the core setPrice logic.',
      'Alert channels cannot be added or removed at runtime because they are compiled into the ticker’s method body.',
    ],
    with: [
      'StockTicker notifies subscribed observers on price change — subscribe once, get pushed updates like real stock alerts.',
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
      'A vending machine walks through insert coin → select item → dispense, and the same buttons behave differently depending on whether it is waiting for money, has a coin, or is out of stock. Rules live in the current mode, not one giant switch. In code, NoCoinState and HasCoinState each implement insertCoin() and dispense() while the machine delegates to the active state object.',
    problemStatement:
      'When the machine is one big enum with if (state == HAS_COIN) dispense() chains, every new mode means editing every transition. Invalid moves — like dispensing before a coin is inserted — slip through because all logic sits in one class instead of state objects that only allow valid moves.',
    tradeoffIntro:
      'Using the vending-machine example: without State, one class checks “if waiting for coin, if has coin, if empty” on every button press. With State, the machine delegates to the current mode object and each mode owns its own rules.',
    scene: [
      'You approach a vending machine and insert a coin. The display changes to “select item” — the same physical buttons now mean something different than they did when the machine was waiting for money.',
      'If the machine is out of stock, pressing the dispense slot does nothing useful even though the button is in the same place. The machine’s current mode decides what each action does.',
      'State works the same way in code: machine.insertCoin() and machine.dispense() delegate to NoCoinState or HasCoinState objects, so behavior lives in the state instead of a sprawling status enum.',
    ],
    without: [
      'if (state == HAS_COIN) dispense() else if (state == NO_COIN) insertCoin() sprawls across the machine — every new mode edits the same transition method.',
      'Invalid moves like dispense() before insertCoin() slip through because nothing enforces per-mode allowed operations.',
      'Adding a SoldOut mode means touching every branch that already knows about NoCoin and HasCoin.',
    ],
    with: [
      'NoCoinState and HasCoinState each implement insertCoin() and dispense() with only the transitions valid for that mode — each mode owns its rules.',
      'The machine context delegates to currentState, so the same button press does different things depending on which state object is active.',
      'New modes are new classes with isolated transition logic, not another elseif in a 200-line switch.',
    ],
    codeBridge: 'State = vending machine: machine.dispense() behavior depends on the current state object.',
    codeBeforeHint: 'Without — if (HAS_COIN) dispense() else if (NO_COIN) insertCoin() on one class.',
    codeAfterHint: 'With — insertCoin() then dispense() moves NoCoin → HasCoin → dispensed.',
    tryItSteps: [
      'Run ▶ — Coin inserted then Item dispensed from the machine states.',
    ],
  },
  strategy: {
    example: 'Checkout payment picker',
    overview:
      'At checkout you pick Card or UPI and hit the same Pay button — the cart page does not rewrite itself for each method. A new provider is a new strategy class, not another elseif. In code, Checkout holds a PaymentStrategy reference and pay() delegates to strategy.process().',
    problemStatement:
      'When Checkout.pay() contains if (card) … else if (upi), adding a new provider means modifying pay() again and testing every branch. Payment algorithms stay trapped in one method instead of interchangeable objects you can swap at runtime.',
    tradeoffIntro:
      'Using the checkout example: without Strategy, Pay is one method full of payment-type if/else. With Strategy, you pick Card or UPI at checkout and pay() delegates to whichever strategy is selected.',
    scene: [
      'You reach checkout on an e-commerce site and see Card and UPI as payment options. The Pay button stays in the same place — only the method behind it changes based on your selection.',
      'When the store adds a new provider next quarter, they add a new payment option without rewriting the entire cart page layout or the core checkout flow.',
      'Strategy works the same way in code: Checkout holds a PaymentStrategy reference, and pay() calls strategy.process() — same Pay button, different algorithm plugged in at runtime.',
    ],
    without: [
      'Checkout.pay() grows with if (card) … else if (upi) … — every new provider edits the same method.',
      'Payment logic cannot be unit-tested in isolation because all algorithms share one sprawling pay() function.',
      'Swapping payment methods at runtime requires branching inside pay() instead of assigning a new strategy object.',
    ],
    with: [
      'Checkout holds a PaymentStrategy reference and pay() delegates to strategy.process() — pick Card or UPI, same Pay button.',
      'Add a new provider by introducing a new strategy class without touching the checkout class or its pay() signature.',
      'Algorithms are interchangeable objects you can inject, mock, and test independently of the cart UI.',
    ],
    codeBridge: 'Strategy = checkout picker: pay() delegates to Card vs UPI strategy.',
    codeBeforeHint: 'Without — if/else payment type inside checkout.',
    codeAfterHint: 'With — Card paid and UPI paid via swapped strategies.',
    tryItSteps: [
      'Run ▶ — Card paid and UPI paid from the same checkout.',
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
      'You make tea and coffee at home using the same overall ritual: heat water, brew the drink, pour into a cup. The steps are identical until you reach how the flavor is extracted.',
      'For tea you steep the bag; for coffee you drip through grounds. You do not write two full recipe cards that both start with “heat water” copied word for word.',
      'Template Method works the same way in code: Beverage.prepare() calls heat(), brew(), and pour() in order. Tea and Coffee override brew() only; the skeleton lives in one base class.',
    ],
    without: [
      'Tea.prepare() and Coffee.prepare() each duplicate heat water and pour steps — fix the order in one and forget the other.',
      'A new drink copies the full three-step ritual again instead of reusing the shared skeleton.',
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
      'A tax auditor visits HR, Engineering, and Sales with the same clipboard but fills a different form at each department. A new audit rule means a new visitor class, not editing every department. In code, department.accept(visitor) uses double-dispatch so TaxVisitor stays separate from the HR, Engineering, and Sales objects.',
    problemStatement:
      'When auditPayroll() and calculateTax() live on HR, Engineering, and Sales, every new report type means editing all three department classes. Departments bloat with algorithms that are not really part of what a department is — they just happen to need auditing.',
    tradeoffIntro:
      'Using the tax-auditor example: without Visitor, every department writes its own tax and report logic inline. With Visitor, the auditor walks the org chart and each department accepts the visitor to run the right form.',
    scene: [
      'A tax auditor arrives at your company with one process but different forms for HR, Engineering, and Sales. Each department hosts the visit; the auditor does not rewrite how HR hires people just to collect payroll data.',
      'When audit rules change next year, the firm sends a new visitor with updated forms. Departments stay focused on their core work instead of accumulating every possible report method.',
      'Visitor works the same way in code: department.accept(taxVisitor) triggers visitHR, visitEngineering, or visitSales via double-dispatch. New operations are new visitor classes, not edits to every department.',
    ],
    without: [
      'auditPayroll(), calculateTax(), and toReport() pile onto HR, Engineering, and Sales — every new report edits every department class.',
      'Departments swell with algorithms that are not intrinsic to running HR or Sales, violating single responsibility.',
      'Adding a headcount report means touching HR, Engineering, and Sales instead of writing one HeadcountVisitor.',
    ],
    with: [
      'department.accept(visitor) double-dispatches to visitHR or visitEngineering — the auditor brings the form, the department accepts the visit.',
      'TaxVisitor and HeadcountVisitor live in separate classes, so new operations do not bloat HR or Sales.',
      'Walk the org chart once with one visitor and collect results, the same way an auditor tours every department with one clipboard.',
    ],
    codeBridge: 'Visitor = tax auditor: accept(visitor) calls visitHR or visitEngineering.',
    codeBeforeHint: 'Without — calculateTax() duplicated on every department class.',
    codeAfterHint: 'With — accept(taxVisitor) prints HR tax and Engineering tax.',
    tryItSteps: [
      'Run ▶ — HR, Engineering, and Sales audited from one visitor walk.',
    ],
  },
};
