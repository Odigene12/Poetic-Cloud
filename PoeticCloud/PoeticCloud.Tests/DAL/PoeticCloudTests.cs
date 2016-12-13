using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PoeticCloud.DAL;
using Moq;
using PoeticCloud.Models;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace PoeticCloud.Tests
{
    [TestClass]
    public class PoeticCloudTests
    {

        Mock<PoemContext> mock_context { get; set; }
        Mock<DbSet<Poem>> mockPoetry { get; set; }
        PoemRepository repo { get; set; }

        List<Poem> myPoems { get; set; }

        public void ConnectMocksToDatastore()
        {
            var queryable_poems = myPoems.AsQueryable();

            //Lie to LINQ make it think that our new Queryable List is a Database table.
            mockPoetry.As<IQueryable<Poem>>().Setup(m => m.Provider).Returns(queryable_poems.Provider);
            mockPoetry.As<IQueryable<Poem>>().Setup(m => m.Expression).Returns(queryable_poems.Expression);
            mockPoetry.As<IQueryable<Poem>>().Setup(m => m.ElementType).Returns(queryable_poems.ElementType);
            mockPoetry.As<IQueryable<Poem>>().Setup(m => m.GetEnumerator()).Returns(() => (queryable_poems.GetEnumerator()));


            //Have our Poem's propery return our Queryable List (fake datable table).
            mock_context.Setup(c => c.Poetry).Returns(mockPoetry.Object);

            //Here, the "It" class has a method called "IsAny" says that there is any instance of the class "Poem" that has an "Add" method, then the Callback method intercepts that data coming in and identifies it as "a" and calls the "Add" method on the "author_list" (which is a list) and adds it to that list.
            mockPoetry.Setup(x => x.Add(It.IsAny<Poem>())).Callback((Poem p) => myPoems.Add(p));
            mockPoetry.Setup(x => x.Remove(It.IsAny<Poem>())).Callback((Poem p) => myPoems.Remove(p));

        }

        //This method runs before every single test (if there are 5 tests, it runs 5 times)
        [TestInitialize]
        public void Initialize()
        {
            mock_context = new Mock<PoemContext>();
            mockPoetry = new Mock<DbSet<Poem>>();
            myPoems = new List<Poem>()
                 {
            new Poem { Title = "Lovely Day", Author = "Blade", Words = "I was thinking about coming to your house, but I heard you live with a mouse" },

            new Poem { Title = "Allergies", Author = "Biti", Words = "Walking through the trees. I feel a breeze. Oh I gotta sneeze. Achoo! Allergies" },

            new Poem {Title = "Another One", Author = "Biti", Words = "You Got Flex" }
                }; //Fake
            repo = new PoemRepository(mock_context.Object);
            ConnectMocksToDatastore();
        }

        [TestMethod]
        public void CanICreateAnInstanceOfRepository()
        {
            //Arrange
            PoemRepository repo = new PoemRepository();
            //Act

            //Assert
            Assert.IsNotNull(repo);
        }

        [TestMethod]
        public void MakeSureIHaveContext()
        {
            PoemRepository repo = new PoemRepository();

            PoemContext actual_context = repo.Context;

            Assert.IsInstanceOfType(actual_context, typeof(PoemContext));
        }

        [TestMethod]
        public void MakeSureICanGetMyPoems()
        {

            //Arrange
            PoemRepository repo = new PoemRepository(mock_context.Object);

            //Act
            List<Poem> myPoetry = repo.GetPoems();

            //Assert
            Assert.AreEqual(myPoetry.Count, 3);
        }

        [TestMethod]
        public void MakeSureICanGetPoemByTitle()
        {
            //Arrange
            PoemRepository repo = new PoemRepository(mock_context.Object);

            //Act
            string title = "Lovely Day";
            Poem found_poem = repo.FindPoemByTitle(title);

            //Assert
            Assert.AreEqual(found_poem.Title, title);
        }

        [TestMethod]
        public void MakeSureICanGetPoemsByAuthor()
        {
            //Arrange
            PoemRepository repo = new PoemRepository(mock_context.Object);

            //Act
            string author = "Biti";
            List<Poem> found_poetry = repo.FindPoemByAuthor(author);

            List<Poem> my_poetry = repo.GetPoems();



            //Assert
            Assert.IsTrue(my_poetry.Contains(found_poetry.FirstOrDefault(p => p.Author.ToLower() == author.ToLower())));
        }

        [TestMethod]
        public void MakeSureICanAddAPoem()
        {
            //Arrange
            PoemRepository repo = new PoemRepository(mock_context.Object);
            Poem newPoem = new Poem() { Title = "Test", Author = "Superman", Words = "This is that stuff right here dog" };

            //Act
            repo.AddPoem(newPoem);

            int numberOfPoems = repo.GetPoems().Count;

            List<Poem> myPoems = repo.GetPoems();

            //Assert
            Assert.IsTrue(myPoems.Contains(newPoem));
        }

        [TestMethod]
        public void MakeSureICanRemoveAPoem()
        {
            //Arrange
            PoemRepository repo = new PoemRepository(mock_context.Object);
            Poem newPoem = new Poem() { Title = "Test", Author = "Superman", Words = "This is that stuff right here dog" };

            //Act
            repo.AddPoem(newPoem);
            Poem removed_poem = repo.RemovePoem(newPoem);

            int numberOfPoems = repo.GetPoems().Count;

           List<Poem> my_poems = repo.GetPoems();

            //Assert
            Assert.IsFalse(my_poems.Contains(removed_poem));
        }
    }
}
