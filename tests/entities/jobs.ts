export interface CreateJob {
  company: string
  jobLocation: string
  jobType: string
  position: string
  status: string
}

export interface Job {
  __v: number
  _id: string
  company: string
  createdAt: string
  createdBy: string
  jobLocation: string
  jobType: string
  position: string
  status: string
  updatedAt: string
}
