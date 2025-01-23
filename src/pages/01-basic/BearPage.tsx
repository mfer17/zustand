import { WhiteCard } from '../../components';
import { useBearStore } from '../../stores';
import { useShallow } from 'zustand/react/shallow';

export const BearPage = () => {
  
  
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        <BlackBears/>

        <PolarBears/>

        <PandaBears/>

        <BearAll/>


      </div>

    </>
  );
};

export const BlackBears = () => {
  const bears = useBearStore(state => state.blackBears );
  const increment = useBearStore(state => state.increaseBlackBears );

  return(
    <WhiteCard centered>
          <h2>Osos Negros</h2>

          <div className="flex flex-col md:flex-row">
            <button onClick={() => increment(+1)}> +1</button>
            <span className="text-3xl mx-2 lg:mx-10"> {bears} </span>
            <button onClick={() => increment(-1)}>-1</button>
          </div>

        </WhiteCard>
  );

}

export const PolarBears = () => {
  const bears = useBearStore(state => state.polarBears );
  const increment = useBearStore(state => state.increasePolarBears );

  return(
    <WhiteCard centered>
          <h2>Osos Polares</h2>

          <div className="flex flex-col md:flex-row">
            <button onClick={() => increment(+1)}> +1</button>
            <span className="text-3xl mx-2 lg:mx-10"> {bears} </span>
            <button onClick={() => increment(-1)}>-1</button>
          </div>

        </WhiteCard>
  );

}

export const PandaBears = () => {
  const bears = useBearStore(state => state.pandaBears );
  const increment = useBearStore(state => state.increasePandaBears);

  return(
    <WhiteCard centered>
          <h2>Osos Pandas</h2>

          <div className="flex flex-col md:flex-row">
            <button onClick={() => increment(+1)}> +1</button>
            <span className="text-3xl mx-2 lg:mx-10"> {bears} </span>
            <button onClick={() => increment(-1)}>-1</button>
          </div>

        </WhiteCard>
  );

}


export const BearAll = () => {
  const allBears = useBearStore( useShallow( state => state.bearsDetails ));
  const doNothing = useBearStore( state => state.doNothing );
  const addBear = useBearStore( state => state.addBear );
  const clearBears = useBearStore( state => state.clearsBears );
  return (
    <WhiteCard>
      <button onClick={doNothing}>Do Nothing</button>
      <button className='mt-2' onClick={addBear}>Add Bear</button>
      <button className='mt-2' onClick={clearBears}>Clear Bears</button>
        <pre>
          {JSON.stringify(allBears, null, 2)}
        </pre>
    </WhiteCard>
  )
}
