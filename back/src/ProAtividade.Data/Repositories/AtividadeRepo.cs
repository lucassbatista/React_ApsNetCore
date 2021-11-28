using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class AtividadeRepo : GeneralRepo, IAtividadeRepo
    {
        private readonly DataContext _context;
        public AtividadeRepo(DataContext context) : base(context)
        {
            _context = context;
        }
        public async Task<Atividade> PegaPorIdAsync(int id)
        {
            IQueryable<Atividade> query = _context.Atividades;

            query = query.AsNoTracking()
                         .OrderBy(atividade => atividade.Id)
                         .Where(atividade => atividade.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Atividade> PegaPorTituloAsync(string titulo)
        {
            IQueryable<Atividade> query = _context.Atividades;

            query = query.AsNoTracking()
                         .OrderBy(atividade => atividade.Id);

            return await query.FirstOrDefaultAsync(atividade => atividade.Titulo == titulo);
        }

        public async Task<Atividade[]> PegaTodasAsync()
        {
            IQueryable<Atividade> query = _context.Atividades;

            query = query.AsNoTracking()
                         .OrderBy(atividade => atividade.Id);

            return await query.ToArrayAsync();
        }
    }
}