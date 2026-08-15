/** Short code snippets for learning — not full textbook examples. */
export const patternCodeSnippets: Record<string, { before: string; after: string }> = {
  singleton: {
    before: `// Two configs — settings can disagree
AppConfig a = new AppConfig();
AppConfig b = new AppConfig();
// a and b are different objects`,
    after: `// One shared config
AppConfig a = AppConfig.getInstance();
AppConfig b = AppConfig.getInstance();
// a == b  → true`,
  },
  factory: {
    before: `void exportReport(String type) {
    if ("pdf".equals(type)) new PdfExporter().export();
    else if ("excel".equals(type)) new ExcelExporter().export();
    // grows with every new format
}`,
    after: `Exporter e = creator.createExporter();
e.export();
// creator subclass picks Pdf vs Excel`,
  },
  'abstract-factory': {
    before: `Button b = new MacButton();
Checkbox c = new WinCheckbox(); // mismatched!`,
    after: `UIFactory f = new MacFactory();
f.createButton();
f.createCheckbox(); // same family`,
  },
  builder: {
    before: `new Burger(bun, beef, null, null, null, true); // 6 args, easy to mess up`,
    after: `Burger b = new BurgerBuilder()
    .cheese("cheddar")
    .build();`,
  },
  prototype: {
    before: `Form copy = new Form();
copy.name = original.name;
copy.address = original.address; // forget a field?`,
    after: `Form copy = original.clone();
copy.name = "Bob"; // original unchanged`,
  },
  adapter: {
    before: `legacy.payNow(amount); // app expects charge()`,
    after: `adapter.charge(amount);
// inside: legacy.payNow(amount)`,
  },
  bridge: {
    before: `class RedCircle extends Circle { /* color locked in subclass */ }`,
    after: `shape = new Circle(new RedColor());
shape.draw(); // shape + color vary separately`,
  },
  composite: {
    before: `if (node.isFolder()) folder.deleteAll();
else file.delete();`,
    after: `root.delete(); // file or folder — same call`,
  },
  decorator: {
    before: `class EncryptedBufferedFile extends ... { /* combo explosion */ }`,
    after: `DataSource s = new Encrypt(new Buffer(plain));
s.read();`,
  },
  facade: {
    before: `inventory.reserve(); payment.charge(); email.send();`,
    after: `hotel.bookWeekend(); // one call inside`,
  },
  flyweight: {
    before: `char.glyph = new Glyph("A"); // per character, heavy`,
    after: `char.glyph = factory.get("A"); // shared glyph`,
  },
  proxy: {
    before: `image = loadFullImage(); // always slow`,
    after: `proxy.display(); // loads on first use only`,
  },
  'chain-of-responsibility': {
    before: `if (p <= 1) l1.handle();
else if (p <= 3) l2.handle();
else eng.handle();`,
    after: `chain.handle(priority, issue);
// each link tries or forwards`,
  },
  command: {
    before: `button.onClick(() -> editor.toggleBold()); // no undo`,
    after: `stack.push(new BoldCommand(editor));
stack.pop().undo();`,
  },
  interpreter: {
    before: `if (rule.contains("AND")) { ... } // string hacks`,
    after: `rule.interpret(user);
// And(role("admin"), role("editor"))`,
  },
  iterator: {
    before: `for (int i = 0; i < arr.length; i++) ...`,
    after: `while (it.hasNext()) it.next();
// hides array vs list`,
  },
  mediator: {
    before: `widgetA.setWidgetB(widgetB); // spaghetti links`,
    after: `mediator.send(from, to, msg);`,
  },
  memento: {
    before: `backup = editor.text; // public field copy`,
    after: `snapshot = editor.save();
editor.restore(snapshot);`,
  },
  observer: {
    before: `setStatus(s) {
    email.send(s); sms.send(s); // hard-coded
}`,
    after: `setStatus(s) {
    for (o : observers) o.onChange(s);
}`,
  },
  state: {
    before: `if (status == PAID) ship();
else if (status == NEW) pay();`,
    after: `context.pay(); // behavior depends on state object`,
  },
  strategy: {
    before: `if ("card".equals(type)) cardPay();
else upiPay();`,
    after: `strategy.pay(amount); // swap strategy at runtime`,
  },
  'template-method': {
    before: `tea.heat(); tea.brew(); tea.pour();
coffee.heat(); coffee.brew(); coffee.pour(); // duplicate`,
    after: `abstract void prepare() {
    heat(); brew(); pour();
}`,
  },
  visitor: {
    before: `circle.exportPdf(); square.exportPdf(); // on every class`,
    after: `node.accept(visitor);
// visitor.export(circle) or export(square)`,
  },
};
