 What is the purpose of using _sessions_?
 It allows users to have their authentication persist during a set period of time
1. What does bcrypt do to help us store passwords in a secure manner.
it hashed the password so it is not stored in plaintext
1. What does bcrypt do to slow down attackers?
It will hash a password and can go through multiple hash cycles to further randomize the password. The hashing proccess is a one way street, so even if a hacker gets the hash and knows how many hash cycles there were, they still won't be able to reverse engineer the hash to get the password. You can also salt the hash which adds a random string to the password, obfuscating the original password even more.
1. What are the three parts of the JSON Web Token?
header payload and signature