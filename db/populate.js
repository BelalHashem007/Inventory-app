const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS book(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(255),
        description TEXT,
        rating NUMERIC(2,1) CHECK (rating >=0 AND rating <=5)
    );

    CREATE TABLE IF NOT EXISTS genre(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255)
    );

     CREATE TABLE IF NOT EXISTS author(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS book_genre(
        bookid INTEGER,
        genreid INTEGER,
        CONSTRAINT pk_book_genre PRIMARY KEY (bookid,genreid),
        CONSTRAINT fk_book FOREIGN KEY (bookid) REFERENCES book(id) ON DELETE CASCADE,
        CONSTRAINT fk_genre FOREIGN KEY (genreid) REFERENCES genre(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS book_author(
        bookid INTEGER,
        authorid INTEGER,
        CONSTRAINT pk_book_author PRIMARY KEY (bookid,authorid),
        CONSTRAINT fk_book FOREIGN KEY (bookid) REFERENCES book(id) ON DELETE CASCADE,
        CONSTRAINT fk_author FOREIGN KEY (authorid) REFERENCES author(id) ON DELETE CASCADE
    );

    INSERT INTO book (title,description,rating) 
    VALUES ('The Adventures of Tom Sawyer',
            $$The irrepressible Tom Sawyer drives his Aunt Polly to distraction; she can’t decide whether to cry or laugh at his antics. He fights, falls in love, and finds adventure with two of his friends, one of whom will later become famous in his own right. Along the way he attends his own funeral, wins the girl by falsely confessing to something she did, and, most famously, convinces most of the boys in town to pay him for the privilege of painting his aunt’s fence.
            The Adventures of Tom Sawyer was Mark Twain’s first novel written solely by himself. Although he was already a well-known author, it was for autobiographical sketches (The Innocents Abroad) and novels written with others (The Gilded Age). In writing about Tom, Twain drew on his childhood growing up in Hannibal, Missouri, infusing the story with his usual biting satire and social commentary. In Tom Sawyer and his friends, Twain created young men who would long outlive him. Not without controversy over the years due to its language and negative depiction of a Native American, The Adventures of Tom Sawyer is arguably Twain’s most endearing, and enduring, work.$$
            ,4.0),
            ('The Strange Case of Dr. Jekyll and Mr. Hyde',
            $$Mr. Gabriel Utterson is a serious, austere lawyer living a humdrum life in Victorian London. Yet there is a strange clause in his friend, Dr. Henry Jekyll's will: should he disappear for more than 3 months, everything will be inherited by Hyde. But after Edward Hyde's darker nature is revealed one dark winters night, Mr. Utterson begins to investigate the connection between the two men, and finds the dark secret binding them closer then he could have ever thought imaginable.
            Adapted countless times in film, some times in video game form, and referenced countless times in popular culture, here is the story that started it all: The Strange Case of Dr. Jekyll & Mr. Hyde!$$
            ,3.9),
            ('Relax & win','',4.0);

    INSERT INTO genre(name)
    VALUES ('FICTION'),
            ('HORROR'),
            ('SPORTS');

    INSERT INTO author(name)
    VALUES ('Mark Twain'),
            ('Robert Louis Stevenson'),
            ('Bud Winter');

    INSERT INTO book_genre(bookid,genreid)
    VALUES (1,1),
            (2,2),
            (3,3);

    INSERT INTO book_author(bookid,authorid)
    VALUES (1,1),
            (2,2),
            (3,3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({ connectionString: process.argv[2] });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done!");
}
main();