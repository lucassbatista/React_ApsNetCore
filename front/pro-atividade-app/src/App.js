import './App.css';
import Atividade from "./pages/atividades/Atividade";
import { Routes, Route } from 'react-router-dom' 
import Cliente from './pages/clientes/Cliente';
import Dashboard from './pages/dashboard/Dashboard';
import ClienteForm from './pages/clientes/ClienteForm';
import PageNotFound from './pages/PageNotFound';


export default function App() {
  return (
      <Routes>      
        <Route path='/' exact element={<Dashboard/>}/>
        <Route path='/atividade/lista' exact element={<Atividade/>}/>
        <Route path='/cliente/:id/atividade' exact element={<Atividade />}/>
        <Route path='/cliente/lista' exact element={<Cliente />}/>
        <Route path='/cliente/Detalhe' exact element={<ClienteForm />}/>
        <Route path='/cliente/Detalhe/:id' exact element={<ClienteForm />}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
  );
}
