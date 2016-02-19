export const partialResults = [
{
  flightId: 1000,
  callsign: 'AFR1000',
  departure: 'LFPG',
  destination: 'LIPZ',
  eobt: Date.now() - 1000*3600*2
}, {
  flightId: 1001,
  callsign: 'MMIKE',
  departure: 'LIML',
  destination: 'EGLL',
  eobt: Date.now() - 1000*3600*4
}, {
  flightId: 1002,
  callsign: 'EZY1002',
  departure: 'LFPG',
  destination: 'LSZH',
  eobt: Date.now() - 1000*3600*3
}, {
  flightId: 1004,
  callsign: 'MMIKE',
  departure: 'EGLL',
  destination: 'LIPX',
  eobt: Date.now() + 1000*3600*2
}];

export const flightsInSector = [
{
  flightId: 1234,
  callsign: 'AFR1015',
  departure: 'LFPG',
  destination: 'LIPZ'
}, {
  flightId: 1235,
  callsign: 'BAW163',
  departure: 'LIML',
  destination: 'EGLL'
}, {
  flightId: 1236,
  callsign: 'EZY123P',
  departure: 'LFPG',
  destination: 'LSZH'
}];

const startProfile = Date.now() - 1000*60*8; // 8 minutes ago
const min = 1000*60;

export const singleResult = {
  flightId: 1234,
  callsign: 'AFR1015',
  departure: 'LFPG',
  destination: 'LIPZ',
  eobt: Date.now() + 1000*3600*2,
  delay: 34,
  pointProfile: [
    {point: 'BUBLI', level: 254, when: startProfile},
    {point: 'LUVAL', level: 310, when: startProfile + 6*min},
    {point: 'PILON', level: 310, when: startProfile + 9*min},
    {point: 'MIRGU', level: 278, when: startProfile + 12*min},
    {point: 'BLM', level: 190, when: startProfile + 14*min}
  ]
};