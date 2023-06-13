class Collection {
    constructor(model) {
      this.model = model;
    }
  
    async add(obj) {
        let newRecord = await this.model.create(obj);
      return newRecord;
    }
  
    async read(data_id) {
        let records = null;
        if (data_id) {
            records = await this.model.findOne({ where: { id: data_id } });

        } else {
            records = await this.model.findAll();
        }
        return records;
    }

    async update(obj,data_id) {
        const record = await this.model.findByPk(data_id);
        if (record) {
          await record.update(obj);
          return record;
        }
        return null;
      }
  
    async delete(data_id) {
      const record = await this.model.findByPk(data_id);
      if (record) {
        await record.destroy();
        return record;
      }
      return null;
    }
    async readAuthorBooks(data_id) {
      let record = await this.model.findAll({
          where: { AuthorId: data_id }
      })
      return record;
  }


  }
  module.exports = Collection;

  