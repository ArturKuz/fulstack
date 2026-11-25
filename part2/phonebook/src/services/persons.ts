import axios from 'axios';
import type { Person } from '../models';

const baseUrl = 'http://localhost:3003/persons'

const getAll: () => Promise<Person[]> = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create: (newObject: Omit<Person, 'id'>) => Promise<Person> = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
} 

const update: (id: number, newObject: Omit<Person, 'id'>) => Promise<Person> = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove: (id: number) => Promise<void> = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }