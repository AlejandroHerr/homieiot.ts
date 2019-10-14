import Property from '../domain/Property';
import HomiePublisher from '../services/HomiePublisher';

export default class PropertyController {
  readonly property: Property;

  readonly homiePublisher: HomiePublisher;

  constructor({ property, homiePublisher }: { property: Property; homiePublisher: HomiePublisher }) {
    this.property = property;
    this.homiePublisher = homiePublisher;
  }

  static create({
    property,
    homiePublisher,
  }: {
    property: Property;
    homiePublisher: HomiePublisher;
  }): PropertyController {
    const propertyController = new PropertyController({ property, homiePublisher });

    return propertyController;
  }
}
