import {createLogger, globalAlwatr, type AlwatrLogger} from '@alwatr/logger';
import {contextConsumer, type DispatchOptions} from '@alwatr/signal';
import {dispatch} from '@alwatr/signal/core.js';

import type {Stringifyable, StringifyableRecord} from '@alwatr/type';

globalAlwatr.registeredList.push({
  name: '@alwatr/fsm',
  version: _ALWATR_VERSION_,
});

export interface MachineConfig<TState extends string, TEventId extends string, TContext extends Stringifyable>
  extends StringifyableRecord {
  /**
   * Machine ID (It is used in the state change signal identifier, so it must be unique).
   */
  id: string;

  /**
   * Initial state.
   */
  initial: TState;

  /**
   * Initial context.
   */
  context: TContext;

  /**
   * States list
   */
  states: {
    [S in TState | '_']: {
      /**
       * An object mapping eventId (keys) to state.
       */
      on: {
        [E in TEventId]?: TState;
      };
    };
  };
}

export interface StateContext<TState extends string, TEventId extends string> {
  [T: string]: string;
  to: TState;
  from: TState | 'init';
  by: TEventId | 'INIT';
}

export class FiniteStateMachine<TState extends string, TEventId extends string, TContext extends Stringifyable> {
  signal;
  context: TContext;

  protected _logger: AlwatrLogger;

  get gotState(): TState {
    return this.signal.getValue()?.to ?? this.config.initial;
  }

  protected setState(to: TState, by: TEventId | 'INIT', options?: DispatchOptions): void {
    dispatch<StateContext<TState, TEventId>>(
        this.signal.id,
        {
          to,
          from: this.signal.getValue()?.to ?? 'init',
          by,
        },
        options,
    );
  }

  constructor(public readonly config: Readonly<MachineConfig<TState, TEventId, TContext>>) {
    this._logger = createLogger(`alwatr/fsm:${config.id}`);
    this._logger.logMethodArgs('constructor', config);
    this.context = config.context;
    this.signal = contextConsumer.bind<StateContext<TState, TEventId>>('finite-state-machine-' + this.config.id);
    this.setState(config.initial, 'INIT');
    if (!config.states[config.initial]) {
      this._logger.error('constructor', 'invalid_initial_state', config);
    }
  }

  /**
   * Machine transition.
   */
  transition(event: TEventId, context?: TContext, options?: DispatchOptions): TState | null {
    const fromState = this.gotState;
    const toState = this.config.states[fromState]?.on?.[event] ?? this.config.states._?.on?.[event];

    this._logger.logMethodFull('transition', {toEventId: event, newContext: context}, toState);

    if (context !== undefined) {
      this.context = context;
    }

    if (toState == null) {
      this._logger.incident(
          'transition',
          'invalid_target_state',
          'Defined target state for this event not found in state config',
          {
            event,
            [fromState]: {...this.config.states._?.on, ...this.config.states[fromState]?.on},
          },
      );
      return null;
    }

    this.setState(toState, event, options);
    return toState;
  }
}
