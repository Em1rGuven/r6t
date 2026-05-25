package database

func (s *ServerDI) AddWord(engWord, turWord, path string) error {
	_, err := s.DB.Exec("INSERT INTO words (engWord, turWord, picture) VALUES(?, ?, ?)", engWord, turWord, path)
	return err
}

func (s *ServerDI) AddSample(word, sample string) error {
	var wordId int
	err := s.DB.QueryRow("SELECT wordID FROM words WHERE engWord = ?", word).Scan(&wordId)
	if err != nil {
		return err
	}

	_, err = s.DB.Exec("INSERT INTO samples(wordID, sample) VALUES(?, ?)", wordId, sample)
	return err
}
