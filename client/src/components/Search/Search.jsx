import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Accordion from 'react-bootstrap/Accordion'
import { createSearchQueryString } from '../../utils/createSearchQueryString'
import { useNavigate, useLocation } from 'react-router-dom'

const Search = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('first_name')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [sort, setSort] = useState('createdAt')
  const [order, setOrder] = useState('desc')

  const location = useLocation()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  let controller
  const handleSubmit = async (e) => {
    e.preventDefault()
    const queryURLString = createSearchQueryString({
      q: search,
      search: filter,
      startDate,
      endDate,
      sort: sort,
      order: order,
    })

    // If search query is the same as previous don't continue
    if (
      (location.pathname === '/search') &
      (location.search === queryURLString)
    )
      return

    navigate(`/search${queryURLString}`)
  }

  useEffect(() => {
    return controller && controller.abort()
  }, [controller])

  return (
    <Form onSubmit={handleSubmit} className="p-5 pb-3">
      <Form.Group className="mb-3" controlId="formSearchBar">
        <Form.Control
          name="Search"
          autoComplete="off"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
        />
      </Form.Group>
      <Accordion className="pb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="text-center">Filters</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3" controlId="formSearchFor">
              <Form.Label>Search Name By</Form.Label>
              <FloatingLabel controlId="floatingSearchFor" label="Search By">
                <Form.Select
                  aria-label="Search By Selector"
                  name="filterBy"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="first_name">First Name</option>
                  <option value="last_name">Last Name</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTimeRange">
              <Form.Label>Search Time Created At</Form.Label>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingTimeRangeStart"
                    label="Start Date"
                  >
                    <Form.Control
                      name="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingTimeRangeEnd"
                    label="End Date"
                  >
                    <Form.Control
                      name="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formOrder">
              <Form.Label>Results Order</Form.Label>
              <Row>
                <Col>
                  <Form.Select
                    aria-label="Search By Selector"
                    name="orderType"
                    onChange={(e) => setSort(e.target.value)}
                    value={sort}
                  >
                    <option value="createdAt">Created</option>
                    <option value="first_name">First Name</option>
                    <option value="last_name">Last Name</option>
                    <option value="updatedAt">Updated</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="Search By Selector"
                    name="order"
                    onChange={(e) => setOrder(e.target.value)}
                    value={order}
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="d-grid">
        <Button variant="secondary" type="submit">
          Search
        </Button>
      </div>
    </Form>
  )
}

export default Search
