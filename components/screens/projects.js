import {
  ArrowLeftIcon,
  DocumentDuplicateIcon,
  DownloadIcon,
  PlusIcon,
  RefreshIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import ProjectCard from '../common/projectCard'
import MSubmitButton from '../common/mSubmitButton'
import TextInput from '../common/TextIput'
import readXlsxFile from 'read-excel-file'
import { Loader } from 'semantic-ui-react'

export default function Projects() {
  let [projects, setProjects] = useState([])
  let [ogProjectList, setOgProjectList] = useState([])
  let [viewPort, setViewPort] = useState('list')
  let [search, setSearch] = useState('')
  let [loading, setLoading] = useState(true)
  let [statusFilter, setStatusFilter] = useState('')
  let [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    fetch('https://construck-backend.herokuapp.com/projects/v2')
      .then((res) => res.json())
      .then((res) => {
        setProjects(res)
        setOgProjectList(res)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    if (search.length >= 3) {
      let projList = projects.filter((w) => {
        let _search = search?.toLocaleLowerCase()
        let prjDescription = w?.prjDescription?.toLocaleLowerCase()

        return prjDescription.includes(_search)
      })
      setProjects(projList)
      setLoading(false)
    }

    if (search.length < 3) {
      setProjects(ogProjectList)
      setLoading(false)
    }
  }, [search])

  function refresh() {
    setLoading(true)
    fetch('https://construck-backend.herokuapp.com/projects/v2')
      .then((res) => res.json())
      .then((res) => {
        setProjects(res)
        setOgProjectList(res)
        setLoading(false)
      })
  }

  async function readFromFile(file) {
    setLoading(true)
    let promises = []
    readXlsxFile(file)
      .then((rows) => {
        rows.forEach((row) => {
          let promise = fetch(
            'https://construck-backend.herokuapp.com/projects/',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                prjDescription: row[2],
              }),
            }
          )

          promises.push(promise)
        })
      })
      .finally(() => {
        Promise.all(promises)
          .then((res) => {
            refresh()
            setLoading(false)
          })
          .finally(() => {
            refresh()
          })
          .catch((err) => {})
      })
      .catch((err) => {})
  }

  useEffect(() => {
    let _projList = [...ogProjectList]
    setProjects(
      statusFilter !== 'all'
        ? _projList.filter((e) => e.eqStatus === statusFilter)
        : ogProjectList
    )
  }, [statusFilter])

  useEffect(() => {
    if (filterBy === statusFilter) {
      setStatusFilter('all')
    } else setStatusFilter(filterBy)
  }, [filterBy])
  return (
    <div className="my-5 flex flex-col space-y-5 px-10">
      <div className="text-2xl font-semibold">Projects</div>
      <div className="flex w-full flex-row items-center justify-between space-x-4">
        {viewPort === 'list' && (
          <MSubmitButton
            submit={() => setViewPort('new')}
            intent="primary"
            icon={<PlusIcon className="h-5 w-5 text-zinc-800" />}
            label="New"
          />
        )}

        {viewPort === 'list' && (
          <div className="mx-auto flex flex-grow flex-col px-40">
            <TextInput placeholder="Search..." setValue={setSearch} />
          </div>
        )}

        {viewPort === 'new' && (
          <MSubmitButton
            submit={() => {
              setViewPort('list')
              refresh()
            }}
            intent="primary"
            icon={<ArrowLeftIcon className="h-5 w-5 text-zinc-800" />}
            label="Back"
          />
        )}

        {viewPort === 'list' && (
          <div className="flex flex-row items-center space-x-5">
            <DownloadIcon className="h-5 w-5 cursor-pointer" />
            <DocumentDuplicateIcon className="h-5 w-5 cursor-pointer" />
            <MSubmitButton
              submit={refresh}
              intent="neutral"
              icon={<RefreshIcon className="h-5 w-5 text-zinc-800" />}
              label="Refresh"
            />
          </div>
        )}
      </div>
      {viewPort === 'list' && (
        <>
          {!loading && projects.length > 0 && (
            <div className="grid gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-4 md:gap-y-6">
              {projects.map((e) => {
                return (
                  <ProjectCard
                    data={{
                      prjDescription: e.prjDescription,
                      status: e.status,
                      customer: e.customer,
                    }}
                    // intent={e.eqStatus}
                  />
                )
              })}
            </div>
          )}

          {(loading || projects.length === 0) && (
            <div className="h-fu mx-auto">
              <Loader active />
            </div>
          )}
        </>
      )}
    </div>
  )
}
