import {DOMSource, VNode, makeDOMDriver, div} from '@cycle/dom';
import {run} from '@cycle/run';
import xs, {Stream} from 'xstream';

type Sources = {
  DOM: DOMSource
}

type Sinks = {
  DOM: Stream<VNode>
}

const drivers = {
  DOM: makeDOMDriver('.app')
}

function main (sources: Sources): Sinks {
  return {
    DOM: xs.of(div('hi'))
  }
}


run(main, drivers);
