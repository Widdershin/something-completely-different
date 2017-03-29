import {DOMSource, VNode, makeDOMDriver, div, button} from '@cycle/dom';
import {run} from '@cycle/run';
import xs, {Stream} from 'xstream';
const shuffle = require('lodash.shuffle');

type Sources = {
  DOM: DOMSource
}

type Sinks = {
  DOM: Stream<VNode>
}

const drivers = {
  DOM: makeDOMDriver('.app')
}

const suggestions = shuffle([
  'Read a book',
  'Knit',
  'Draw',
  'Go for a walk',
  'Call a family member',
  'Write',
  'Exercise',
  'Meditate',
  'Skateboard',
  'Listen to music',
  'Watch a movie you love',
  'Play an instrument',
  'Journal',
  'Take photos',
  'Play a game',
  'Go somewhere new',
  'Tidy',
  'Fix something broken',
  'Cook',
  'Bake',
  'Watch a Monty Python skit',
  'Nap',
  'Go see a friend',
  'Tidy',
  'Play a boardgame',
  'Plan a holiday',
]);


function view (index: number): VNode {
  const screenWidth = window.innerWidth;

  const suggestion = suggestions[index % suggestions.length];
  const hue = index % suggestions.length / suggestions.length * 360;

  const color = `hsl(${hue}, 90%, 95%)`;

  return (
    div('.something-completely-different', {style: {background: color}}, [
      div('.explanation', [
        div('Stuck in a loop browsing the internet?'),
        div('Try something completely different. Maybe you could...'),
      ]),

      div(
        '.suggestion',
        {
          key: suggestion,
          style: {
            transform: `translate(${screenWidth}px, 0px)`,
            delayed: {
              transform: `translate(0px, 0px)`
            },
            remove: {
              transform: `translate(-${screenWidth}px)`,
            }
          }
        },
        `${suggestion}!`
      ),

      button('.next-suggestion', 'Or something completely different!')
    ])
  );
}

function main (sources: Sources): Sinks {
  const nextSuggestion$ = sources.DOM
    .select('.next-suggestion')
    .events('click')
    .mapTo(+1);

  const suggestionIndex$ = nextSuggestion$
    .fold((acc, val) => acc + val, Math.floor(Math.random() * suggestions.length));

  return {
    DOM: suggestionIndex$.map(view)
  }
}


run(main, drivers);
