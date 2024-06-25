package Day04.JAVA;

class crawlerLogFolder {
    public int minOperations(String[] logs) {
        int currentDepth = 0;
        for (String log : logs) {
            if ("../".equals(log)) {
                if (currentDepth > 0) {
                    currentDepth--;
                }
            } else if (!"./".equals(log)) {
                currentDepth++;
            }
        }

        return currentDepth;
    }

    public static void main(String[] args) {
        String[] logs = {"d1/", "d2/", "../", "d21/", "./"};
        crawlerLogFolder minOp = new crawlerLogFolder();

        long startTime = System.nanoTime(); // start timing
        System.out.println(minOp.minOperations(logs));
        long endTime = System.nanoTime(); // end timing
        System.out.println("Execution Time: " + (endTime - startTime) + " ns");

        // String[] logs = {"d1/", "d2/", "../", "d21/", "./"};
        System.out.println(minOp.minOperations(logs));
    }
}