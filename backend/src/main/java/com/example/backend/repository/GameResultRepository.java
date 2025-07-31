package com.example.backend.repository;

import com.example.backend.entity.GameResult;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {
    Optional<GameResult> findByUser(User user);
}
