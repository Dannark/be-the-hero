const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const {page = 1} = request.query

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
            .limit(5)
            .offset( (page-1)*5 )

        response.header("X-Total-Count", count['count(*)'])

        return response.json(incidents)
    },
    async create(request, response){
        const {title, description, value } = request.body
        const ong_id = request.headers.authorization

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id })
    },

    async delete(request, response){
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if(incident && incident.ong_id != ong_id){
            return response.status(401).json({error:'Operation not permitted.'})
        }
        if(incident == undefined){
            return response.status(400).json({error:'User not Found.'})
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send()
    }
}