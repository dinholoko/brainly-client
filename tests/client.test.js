const Client = require('../src/brainly')
const servers = require('../src/servers')

describe('Testing client server property', () => {
  it('Should define the correct url based on server parameter', () => {
    const brainly = new Client({ server: 'BR' });

    const expectedUrl = servers['BR'].url;

    expect(brainly.config.server.url).toBe(expectedUrl);
  })

  it('Should define default url whenever server parameter is not defined', () => {
    const brainly = new Client({});

    const expectedUrl = servers.DEFAULT.url;

    expect(brainly.config.server.url).toBe(expectedUrl);
  })

  it('Should define default url whenever server parameter is null', () => {
    const brainly = new Client();

    const expectedUrl = servers.DEFAULT.url;

    expect(brainly.config.server.url).toBe(expectedUrl);
  })

  it('Should define default url whenever server parameter does not exist', () => {
    const brainly = new Client({ server: 'test' });

    const expectedUrl = servers.DEFAULT.url;

    expect(brainly.config.server.url).toBe(expectedUrl);
  })

  it('Should throw an error when parameter passed is neither an object nor null', () => {
    expect(() => new Client(5)).toThrow('Parameter must be an object')
  })
})

describe('Testing method search', () => {
  const client = new Client()

  it('Should return an object', async () => {
    const results = await client.search('Test')

    expect(typeof results).toBe('object')
  })

  it('Should have 5 results when no parameter is specified', async () => {
    const results = await client.search('Test')

    expect(results.length).toBe(5)
  })

  it('Should have 10 results', async () => {
    const results = await client.search({ query: 'Test', first: 10 })

    expect(results.length).toBe(10)
  })

  it('Should throw an error when parameter \'First\' is longer than 100', async () => {
    expect(async () => await client.search({ query: 'Test', first: 150 }).rejects.toThrow('Parameter \'First\' can\'t be longer than 100'))
  })
})