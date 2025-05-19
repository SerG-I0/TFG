
package springapp.dao;

import springapp.model.Puerto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PuertoRepository extends MongoRepository<Puerto, String> {
}
