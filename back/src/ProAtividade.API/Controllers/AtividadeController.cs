using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;
        public AtividadeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade Get(int id)
        {
            return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
        }

        [HttpPost]
        public IEnumerable<Atividade> Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);
            if(_context.SaveChanges() > 0)
                return _context.Atividades;
            else
                throw new Exception("Não foi possivel adicionar a atividade");
        }

        [HttpPut]
        public Atividade Put(int id, Atividade atividade)
        {
            if(atividade.Id != id) throw new Exception("Os ids das Atividades não podem ser diferentes");

            if(_context.Atividades.FirstOrDefault(ativ => ativ.Id == id) == null) throw new Exception("A atividade nao existe");

            _context.Update(atividade);
            if(_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
            else
                throw new Exception("Não foi possivel atualizar a atividade");
        }

        [HttpDelete]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);

            if(atividade == null) throw new Exception("A atividade nao existe");

            _context.Remove(atividade);

            return _context.SaveChanges() > 0;
        }
   
    }
}