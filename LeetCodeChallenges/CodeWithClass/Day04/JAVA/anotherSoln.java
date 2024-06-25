package Day04.JAVA;

class anotherSoln {
    public int minOperations(String[] logs) {
        int x = 0;

        for(String s : logs)
            x += add(s, x);

        return x;
    }

    public int add(String s, int x){
        return s.charAt(1) == '.' ? x == 0 ? 0 : - 1 : s.charAt(0) == '.' ? 0 : 1;
    }
}