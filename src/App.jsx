
import './App.css'
import { Col, Container, Navbar, Row, Spinner, Toast } from 'react-bootstrap'
import TodosForm from './components/TodosForm'
import TodosList from './components/TodosList'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [ toDos, setToDos ] = useState([]);
  const [ notification, setNotification ] = useState({message: "", variant: "success", show: false})
  const [ isLoading, setIsLoading ] = useState(true);
  const [ toDoSelected, setToDoSelected ] = useState(null);

  useEffect(() => {
    getToDos();
  }, []);
  
  const getToDos = () => {
    axios.get('https://todos-crud.fly.dev/api/v1/todos')
      .then(res => setToDos(res.data))
      .finally(() => setIsLoading(false));
  }


  const showSuccessNotf = (message) => {
    setNotification({ message, variant: "success", show: true})
  }

  const showFailNotf = (message) => {
    setNotification({ 
      message: message ? message : 'There was an error', 
      variant: "danger", 
      show: true
    })
  }

  const selectToDo = toDo => setToDoSelected(toDo);
  const deselectToDo = () => setToDoSelected(null);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            To Do's
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Spinner className={`ms-auto d-block ${!isLoading && 'invisible'}`} />
        <Row>
          <Col>
            <TodosForm 
              getToDos={getToDos}
              showSuccessNotf={showSuccessNotf}
              showFailNotf={showFailNotf}
              setIsLoading={setIsLoading}
              toDoSelected={toDoSelected}
              deselectToDo={deselectToDo}
            />
          </Col>
          <Col>
            <TodosList
              toDos={toDos}
              getToDos={getToDos}
              showSuccessNotf={showSuccessNotf}
              showFailNotf={showFailNotf}
              setIsLoading={setIsLoading}  
              selectToDo={selectToDo}
            />
          </Col>
        </Row>
      </Container>
      <Container style={{position: 'fixed', bottom: '40px', left: 0, right: 0}}>
        <Toast 
          onClose={() => setNotification({...notification, show: false})} 
          position="bottom-start"
          show={notification.show} 
          bg={notification.variant}
          delay={3000}
          autohide 
        >
            <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      </Container>
    </>
  )
}

export default App
