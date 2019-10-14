import Node from '../domain/Node';
import HomiePublisher from '../services/HomiePublisher';

export default class NodeController {
  readonly node: Node;

  readonly homiePublisher: HomiePublisher;

  constructor({ node, homiePublisher }: { node: Node; homiePublisher: HomiePublisher }) {
    this.node = node;
    this.homiePublisher = homiePublisher;
  }

  static create({ node, homiePublisher }: { node: Node; homiePublisher: HomiePublisher }): NodeController {
    const nodeController = new NodeController({ node, homiePublisher });

    return nodeController;
  }
}
