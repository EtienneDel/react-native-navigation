import { NativeCommandsSender } from './adapters/NativeCommandsSender';
import { NativeEventsReceiver } from './adapters/NativeEventsReceiver';
import { UniqueIdProvider } from './adapters/UniqueIdProvider';
import { Store } from './components/Store';
import { ComponentRegistry } from './components/ComponentRegistry';
import { Commands } from './commands/Commands';
import { LayoutTreeParser } from './commands/LayoutTreeParser';
import { LayoutTreeCrawler } from './commands/LayoutTreeCrawler';
import { PrivateEventsListener } from './events/PrivateEventsListener';
import { PublicEventsRegistry } from './events/PublicEventsRegistry';
import { ComponentProvider } from 'react-native';
import { Element } from './adapters/Element';

class Navigation {
  public readonly Element = Element;

  private readonly store = new Store();
  private readonly nativeEventsReceiver = new NativeEventsReceiver();
  private readonly uniqueIdProvider = new UniqueIdProvider();
  private readonly componentRegistry = new ComponentRegistry(this.store);
  private readonly layoutTreeParser = new LayoutTreeParser();
  private readonly layoutTreeCrawler = new LayoutTreeCrawler(this.uniqueIdProvider, this.store);
  private readonly nativeCommandsSender = new NativeCommandsSender();
  private readonly commands = new Commands(this.nativeCommandsSender, this.layoutTreeParser, this.layoutTreeCrawler);
  private readonly publicEventsRegistry = new PublicEventsRegistry(this.nativeEventsReceiver);
  private readonly privateEventsListener = new PrivateEventsListener(this.nativeEventsReceiver, this.store);

  constructor() {
    this.privateEventsListener.listenAndHandlePrivateEvents();
  }

  /**
   * Every navigation component in your app must be registered with a unique name. The component itself is a traditional React component extending React.Component.
   * @param {string} componentName Unique component name
   * @param {function} getComponentClassFunc generator function, typically `() => require('./myComponent')`
   */
  registerComponent(componentName: string, getComponentClassFunc: ComponentProvider) {
    this.componentRegistry.registerComponent(componentName, getComponentClassFunc);
  }

  /**
   * Reset the navigation stack to a new component (the stack root is changed).
   * @param {Root} root
   */
  setRoot(params) {
    return this.commands.setRoot(params);
  }

  /**
   * Set default options to all screens. Useful for declaring a consistent style across the app.
   * @param {options:Options} options
   */
  setDefaultOptions(options) {
    this.commands.setDefaultOptions(options);
  }

  /**
   * Change a components navigation options
   * @param {string} componentId The component's id.
   * @param {options:Options} options
   */
  setOptions(componentId, options) {
    this.commands.setOptions(componentId, options);
  }

  /**
   * Show a screen as a modal.
   * @param {object} params
   */
  showModal(params) {
    return this.commands.showModal(params);
  }

  /**
   * Dismiss a modal by componentId. The dismissed modal can be anywhere in the stack.
   * @param {string} componentId The component's id.
   */
  dismissModal(componentId) {
    return this.commands.dismissModal(componentId);
  }

  /**
   * Dismiss all Modals
   */
  dismissAllModals() {
    return this.commands.dismissAllModals();
  }

  /**
   * Push a new screen into this screen's navigation stack.
   * @param {string} componentId The component's id.
   * @param {Component} component
   */
  push(componentId, component) {
    return this.commands.push(componentId, component);
  }

  /**
   * Pop a component from the stack, regardless of it's position.
   * @param {string} componentId The component's id.
   * @param {*} params
   */
  pop(componentId, params) {
    return this.commands.pop(componentId, params);
  }

  /**
   * Pop the stack to a given component
   * @param {string} componentId The component's id.
   */
  popTo(componentId) {
    return this.commands.popTo(componentId);
  }

  /**
   * Pop the component's stack to root.
   * @param {*} componentId
   */
  popToRoot(componentId) {
    return this.commands.popToRoot(componentId);
  }

  /**
   * Show overlay on top of the window
   * @param {*} params
   */
  showOverlay(params) {
    return this.commands.showOverlay(params);
  }

  /**
   * dismiss overlay by componentId
   * @param {string} componentId
   */
  dismissOverlay(componentId) {
    return this.commands.dismissOverlay(componentId);
  }

  /**
   * Obtain the events registery instance
   */
  events() {
    return this.publicEventsRegistry;
  }
}

export const singleton = new Navigation();