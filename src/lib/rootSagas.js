import dataSaga from '../reducers/data/dataSaga';

export default function* sagas() {
  yield [
    ...dataSaga,
  ];
}
