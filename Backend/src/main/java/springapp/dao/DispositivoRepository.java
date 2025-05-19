
package springapp.dao;

import springapp.model.Dispositivo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DispositivoRepository extends MongoRepository<Dispositivo, String> {
}
