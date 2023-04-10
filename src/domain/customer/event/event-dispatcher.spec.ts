import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import { EnviaConsoleLogHandler } from "./handler/customer-address-changed.handler";
import { EnviaConsoleLog1Handler, EnviaConsoleLog2Handler } from "./handler/customer-created.handler";

describe("Customer Domain events tests", () => {
  
  it("Should notify event handler when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const h1 = new EnviaConsoleLog1Handler();
    const h2 = new EnviaConsoleLog2Handler();
    
    const spyH1 = jest.spyOn(h1, "handle");
    const spyH2 = jest.spyOn(h2, "handle");

    eventDispatcher.register(CustomerCreatedEvent.name, h1);
    eventDispatcher.register(CustomerCreatedEvent.name, h2);

    expect(
      eventDispatcher.getEventHandlers[CustomerCreatedEvent.name][0]
    ).toMatchObject(h1);
    
    expect(
      eventDispatcher.getEventHandlers[CustomerCreatedEvent.name][1]
    ).toMatchObject(h2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyH1).toHaveBeenCalled();
    expect(spyH2).toHaveBeenCalled();
  });

  it("Should notify event handler when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const h1 = new EnviaConsoleLog1Handler();
    const h2 = new EnviaConsoleLog2Handler();
    
    const spyH1 = jest.spyOn(h1, "handle");
    const spyH2 = jest.spyOn(h2, "handle");

    eventDispatcher.register(CustomerCreatedEvent.name, h1);
    eventDispatcher.register(CustomerCreatedEvent.name, h2);

    expect(
      eventDispatcher.getEventHandlers[CustomerCreatedEvent.name][0]
    ).toMatchObject(h1);
    
    expect(
      eventDispatcher.getEventHandlers[CustomerCreatedEvent.name][1]
    ).toMatchObject(h2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyH1).toHaveBeenCalled();
    expect(spyH2).toHaveBeenCalled();
  });

  it("Should notify event handler when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new EnviaConsoleLogHandler();
    
    const spyHandler = jest.spyOn(handler, "handle");

    eventDispatcher.register(CustomerAddressChangedEvent.name, handler);

    expect(
      eventDispatcher.getEventHandlers[CustomerAddressChangedEvent.name][0]
    ).toMatchObject(handler);
    
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "123",
      name: 'Vagner',
      address: 'Rua Vb 46'
    });

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyHandler).toHaveBeenCalled();
  });

});
