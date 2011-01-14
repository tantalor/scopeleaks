var scopeleaks = load("scopeleaks.js");

if (scopeleaks.leaks().length != 0) print("fail") && quit();

x = 1, y = 2;

if (scopeleaks.leaks().length != 2) print("fail") && quit();

print("ok");
