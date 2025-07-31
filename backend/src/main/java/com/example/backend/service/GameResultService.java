package com.example.backend.service;

import com.example.backend.entity.GameResult;
import com.example.backend.entity.User;
import com.example.backend.repository.GameResultRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GameResultService {

    private final GameResultRepository gameResultRepository;

    public GameResultService(GameResultRepository gameResultRepository) {
        this.gameResultRepository = gameResultRepository;
    }

    public GameResult recordWin(User user) {
        Optional<GameResult> existingResult = gameResultRepository.findByUser(user);

        if (existingResult.isPresent()) {
            GameResult result = existingResult.get();
            result.setWins(result.getWins() + 1);
            return gameResultRepository.save(result);
        } else {
            GameResult result = new GameResult(user, user.getUsername(), 1);
            return gameResultRepository.save(result);
        }
    }
}
