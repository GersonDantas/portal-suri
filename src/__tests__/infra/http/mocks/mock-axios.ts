import faker from '@faker-js/faker'
import axios from 'axios'

export const mockedHttpResponse = (): any => ({
  status: faker.datatype.number(),
  data: faker.random.objectElement({})
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(mockedHttpResponse)
  return mockedAxios
}
