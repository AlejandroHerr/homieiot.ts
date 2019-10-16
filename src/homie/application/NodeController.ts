import ApplicationError from '../../core/application/ApplicationError';

import Node from '../domain/Node';
import PropertyPropsDTO from '../dto/PropertyPropsDTO';
import HomiePublisher from '../services/HomiePublisher';
import addPropertyUseCase from '../useCases/addPropertyUseCase';
import nodeHasPropertyUseCase from '../useCases/nodeHasPropertyUseCase';

export default class NodeController {
  readonly node: Node;

  readonly homiePublisher: HomiePublisher;

  constructor({ node, homiePublisher }: { node: Node; homiePublisher: HomiePublisher }) {
    this.node = node;
    this.homiePublisher = homiePublisher;
  }

  hasProperty(propertyId: string): boolean {
    return nodeHasPropertyUseCase({ node: this.node, propertyId });
  }

  async addProperty(propertyProps: PropertyPropsDTO): Promise<this> {
    const result = await addPropertyUseCase({ node: this.node, propertyProps, homiePublisher: this.homiePublisher });

    if (result.failed()) {
      throw ApplicationError.create(result.error);
    }

    return this;
  }

  static create({ node, homiePublisher }: { node: Node; homiePublisher: HomiePublisher }): NodeController {
    const nodeController = new NodeController({ node, homiePublisher });

    return nodeController;
  }
}
